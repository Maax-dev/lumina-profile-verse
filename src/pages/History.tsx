
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <ThemeToggle />
      
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/joe-bruin.png" alt="Joe Bruin" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">Linkd Search History</h1>
          </div>
          <Link to="/">
            <Button variant="outline">New Search</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {searchHistory.map((item) => (
            <Link to={`/results?q=${encodeURIComponent(item.query)}`} key={item.id}>
              <Card className="hover:bg-accent/5 transition-colors">
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
            </Link>
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
