
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBox } from "@/components/SearchBox";
import { Link } from "react-router-dom";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-4 right-4 flex items-center gap-4">
        <Link to="/history">
          <Button variant="ghost" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Search History
          </Button>
        </Link>
        <ThemeToggle />
      </nav>
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto animate-fadeIn">
          <div className="mb-8">
            <img 
              src="/joe-bruin.png" 
              alt="Joe Bruin" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent ucla-gradient-light dark:ucla-gradient-dark mb-4">
              Linkd
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Connect with UCLA's Exceptional Alumni Network
            </p>
          </div>
          <SearchBox />
        </div>
      </section>
    </div>
  );
};

export default Index;
