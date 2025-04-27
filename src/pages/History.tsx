import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SearchHistory {
  query: string;
  total: number;
  source: string;
  result: any[];
}

export default function History() {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/getHistory");
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
        endpoint: item.source
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
            <h1 className="text-8xl font-bold">
              <span className="bg-gradient-to-r from-ucla-blue via-ucla-gold to-ucla-blue bg-clip-text text-transparent bg-[length:200%_200%] animate-shimmer">
                GradNet
              </span>
            </h1>
          </div>
          <Link to="/">
            <Button variant="outline">New Search</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-ucla-blue dark:text-ucla-lighter-blue mb-4" />
              <p className="text-muted-foreground">Loading search history...</p>
            </div>
          ) : (
            <>
              {searchHistory.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleHistoryClick(item)}
                  className="cursor-pointer"
                >
                  <Card className="hover:bg-accent/5 transition-colors hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.query}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.total} results • {item.source === "/getPeopleByNLP" ? "NLP Search" : "Standard Search"}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
