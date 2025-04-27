
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchBox() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl animate-fadeIn">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Find software alumni from SJSU in LA..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-12 pl-4 pr-12 text-lg bg-background border-2 border-primary/20 focus:border-primary rounded-lg placeholder:text-muted-foreground/50"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 w-8 h-8 rounded-md"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
