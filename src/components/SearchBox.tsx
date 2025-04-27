
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate("/results");
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Find software alumni from SJSU in LA..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-14 pl-6 pr-14 text-lg bg-background/20 backdrop-blur-sm border-2 border-white/20 focus:border-white/40 rounded-2xl dark:placeholder:text-white/70 dark:text-white placeholder:text-foreground/70 text-foreground"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 dark:text-white text-foreground"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
