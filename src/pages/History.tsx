
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SearchHistory {
  query: string;
  total: number;
  source: string; // ✅ /getPeople or /getPeopleByNLP
  result: any[];  // ✅ the full list of alumni
}

export default function History() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/getHistory"); // ✅ Corrected URL
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        const backendHistory = await response.json();
        setSearchHistory(backendHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
        toast({
          title: "Error",
          description: "Failed to load search history",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleHistoryClick = (item: SearchHistory) => {
    console.log("Navigating from history:", item);

    navigate("/results", {
      state: {
        searchData: {
          results: item.result || [],
          total: item.total,
          query: item.query
        },
        endpoint: item.source // ✅ important: preserve the correct endpoint!
      }
    });
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
            <Button variant="outline" className="border-ucla-blue/50 dark:border-ucla-lighter-blue/50 text-ucla-blue dark:text-ucla-lighter-blue hover:bg-ucla-blue/10 dark:hover:bg-ucla-lighter-blue/10">New Search</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {searchHistory.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => handleHistoryClick(item)}
              className="cursor-pointer"
            >
              <Card className="hover:bg-accent/5 transition-colors hover:scale-105" style={{
                borderWidth: '2px',
                borderImageSlice: '1',
                borderStyle: 'solid',
                borderImage: 'linear-gradient(90deg, var(--ucla-blue) 50%, var(--ucla-gold) 50%) 1',
                borderRadius: '0.75rem',
              }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.query}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.total} results • {item.source === "/getPeopleByNLP" ? "NLP Search" : "Standard Search"}
                      </p>
                    </div>
                    <Clock className="h-5 w-5 text-ucla-gold dark:text-ucla-darker-gold" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          
          {searchHistory.length === 0 && !isLoading && (
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
