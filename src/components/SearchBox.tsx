
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
      <div className="relative flex items-center"
        style={{
          borderWidth: '3px',
          borderImageSlice: '1',
          borderStyle: 'solid',
          borderImage: 'linear-gradient(90deg, var(--ucla-blue) 50%, var(--ucla-gold) 50%) 1',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(39, 116, 174, 0.1), 0 2px 4px -1px rgba(255, 209, 0, 0.06)'
        }}>
        <Input
          type="text"
          placeholder="Find software alumni from SJSU in LA..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-16 pl-6 pr-14 text-lg bg-background/20 backdrop-blur-sm rounded-2xl dark:placeholder:text-white/70 dark:text-white placeholder:text-foreground/70 text-foreground border-none"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-3 w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 dark:text-white text-foreground"
        >
          <Search className="h-6 w-6" />
        </Button>
      </div>
    </form>
  );
}
