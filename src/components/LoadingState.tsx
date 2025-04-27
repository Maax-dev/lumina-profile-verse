
import React from "react";
import { Loader } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const LoadingState = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-ucla-blue/20 to-ucla-gold/20 p-4">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center space-y-4">
          <Loader className="animate-spin h-12 w-12 mx-auto text-ucla-blue dark:text-ucla-lighter-blue" />
          <h2 className="text-2xl font-semibold">Loading Alumni Data</h2>
          <p className="text-muted-foreground">Please wait while we fetch the results...</p>
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
