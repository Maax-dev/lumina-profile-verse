
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBox } from "@/components/SearchBox";
import { Link } from "react-router-dom";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-4 right-4 flex items-center gap-4 z-50">
        <Link to="/history">
          <Button variant="ghost" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Search History
          </Button>
        </Link>
        <ThemeToggle />
      </nav>
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden animate-fadeAndSlideUp">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
        <div className="animate-flow-gradient absolute inset-0 bg-gradient-to-r from-ucla-blue/10 via-ucla-gold/5 to-ucla-blue/10 z-[-1]"></div>
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/joe-bruin.png" 
                alt="Joe Bruin" 
                className="w-20 h-20 animate-scaleIn"
              />
              <div className="relative ml-4">
                <svg className="w-36 h-16 animate-scaleIn delay-200" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10H10V50H20V35H30V50H40V10H30V25H20V10Z" className="fill-ucla-darkest-blue dark:fill-ucla-lighter-blue" />
                  <path d="M50 10H60V40H80V50H50V10Z" className="fill-ucla-darkest-blue dark:fill-ucla-lighter-blue" />
                  <path d="M90 10H100V40H110V10H120V50H80V40H90V10Z" className="fill-ucla-darkest-blue dark:fill-ucla-lighter-blue" />
                  <circle cx="110" cy="45" r="5" className="fill-ucla-darkest-gold dark:fill-ucla-gold" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold ucla-gradient-light dark:ucla-gradient-dark mb-4 animate-fadeAndSlideUp delay-300">
              Linkd
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fadeAndSlideUp delay-400">
              Connect with UCLA's Exceptional Alumni Network
            </p>
          </div>
          <div className="animate-fadeAndSlideUp delay-500">
            <SearchBox />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
