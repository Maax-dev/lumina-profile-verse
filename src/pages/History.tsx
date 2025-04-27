
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SearchHistory {
  id: string;
  query: string;
  timestamp: string;
  results: number;
}

export default function History() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);
  
  const handleHistoryClick = (query: string) => {
    navigate(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <nav className="fixed top-4 right-4 flex items-center gap-4 z-50">
        <ThemeToggle />
      </nav>
      
      <div className="max-w-4xl mx-auto py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <img 
                src="/joe-bruin.png" 
                alt="Joe Bruin" 
                className="h-12 w-12"
              />
              <div className="ml-2">
                <svg className="w-24 h-10" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 10H10V50H20V35H30V50H40V10H30V25H20V10Z" className="fill-ucla-blue dark:fill-ucla-lighter-blue" />
                  <path d="M50 10H60V40H80V50H50V10Z" className="fill-ucla-blue dark:fill-ucla-lighter-blue" />
                  <path d="M90 10H100V40H110V10H120V50H80V40H90V10Z" className="fill-ucla-blue dark:fill-ucla-lighter-blue" />
                  <circle cx="110" cy="45" r="5" className="fill-ucla-gold dark:fill-ucla-darker-gold" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold">Search History</h1>
          </div>
          <Link to="/">
            <Button variant="outline">New Search</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {searchHistory.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleHistoryClick(item.query)}
              className="cursor-pointer"
            >
              <Card className="hover:bg-accent/5 transition-colors hover:scale-105">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.query}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.results} results • {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <HistoryIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {searchHistory.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <HistoryIcon className="h-12 w-12 mx-auto mb-4" />
              <p>No search history yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
