
import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Progress } from "@/components/ui/progress";

const LoadingGame = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [target, setTarget] = useState({ x: 70, y: 30 });
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100);

  // Generate a new target position
  const generateTarget = () => {
    setTarget({
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 80) + 10
    });
  };

  // Handle key press for moving the player
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 5;
      setPosition(prev => {
        const newPos = { ...prev };
        
        switch(e.key) {
          case 'ArrowUp':
          case 'w':
            newPos.y = Math.max(0, prev.y - step);
            break;
          case 'ArrowDown':
          case 's':
            newPos.y = Math.min(100, prev.y + step);
            break;
          case 'ArrowLeft':
          case 'a':
            newPos.x = Math.max(0, prev.x - step);
            break;
          case 'ArrowRight':
          case 'd':
            newPos.x = Math.min(100, prev.x + step);
            break;
        }
        
        return newPos;
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check if player catches the target
  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(position.x - target.x, 2) + 
      Math.pow(position.y - target.y, 2)
    );
    
    if (distance < 8) { // If close enough to target
      setScore(prev => prev + 1);
      generateTarget();
    }
  }, [position, target]);

  // Progress bar timer
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 0.5;
      });
      
      setTimeLeft(prev => Math.max(0, prev - 0.5));
    }, 50);
    
    return () => clearInterval(timer);
  }, []);

  // Handle clicks for mobile users
  const handleClick = (e: React.MouseEvent) => {
    const gameArea = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - gameArea.left) / gameArea.width) * 100;
    const y = ((e.clientY - gameArea.top) / gameArea.height) * 100;
    
    setPosition({ x, y });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ucla-blue/20 to-ucla-gold/20 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-xl w-full mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2">Loading Results</h1>
        <p className="text-lg mb-8">Play while you wait...</p>
        
        <Progress value={progress} className="mb-4 h-2" />
        
        <div className="relative w-full h-[400px] bg-background/50 backdrop-blur-md border-4 border-ucla-blue/50 dark:border-ucla-lighter-blue/50 rounded-xl mb-6 overflow-hidden"
             onClick={handleClick}>
          {/* Target */}
          <div 
            className="absolute w-8 h-8 rounded-full bg-ucla-gold animate-pulse"
            style={{
              left: `calc(${target.x}% - 1rem)`,
              top: `calc(${target.y}% - 1rem)`
            }}
          />
          
          {/* Player */}
          <div 
            className="absolute w-8 h-8 rounded-full bg-ucla-blue dark:bg-ucla-lighter-blue shadow-lg"
            style={{
              left: `calc(${position.x}% - 1rem)`,
              top: `calc(${position.y}% - 1rem)`,
              transition: 'left 0.1s, top 0.1s'
            }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">Score: {score}</div>
          <div className="text-lg font-semibold">Loading: {progress.toFixed(0)}%</div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          Use arrow keys or click/tap to move the blue dot to collect the gold targets
        </div>
      </div>
    </div>
  );
};

export default LoadingGame;
