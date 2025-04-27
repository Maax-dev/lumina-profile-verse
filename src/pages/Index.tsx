
import { SearchBox } from "@/components/SearchBox";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      <div className="fixed top-4 left-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-ucla-blue/20 to-ucla-gold/5 z-0" />
      <div className="animate-flow-gradient absolute inset-0 bg-gradient-to-r from-ucla-blue/10 via-ucla-gold/5 to-ucla-blue/10 z-[-1]" />
      
      <div className="relative z-10 text-center space-y-12 max-w-4xl mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold animate-bounce-slow">
            <span className="bg-gradient-to-r from-ucla-blue via-ucla-gold to-ucla-blue bg-clip-text text-transparent bg-[length:200%_200%] animate-shimmer">
              GradNet
            </span>
          </h1>
          <p className="text-xl md:text-2xl dark:text-white/90 text-foreground/90 animate-fadeIn">
            Search less. Connect more.
          </p>
        </div>
        
        <div className="w-full max-w-4xl mx-auto animate-fadeIn">
          <SearchBox />
        </div>
      </div>
    </div>
  );
}

export default Index;
