
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const searchSchema = z.object({
  keys: z.string().optional(),
  loc: z.string().optional(),
  alum: z.string().optional(),
  nlpQuery: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function SearchBox() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNLP, setIsNLP] = useState(false);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keys: "",
      loc: "",
      alum: "",
      nlpQuery: "",
    },
  });

  const onSubmit = async (data: SearchFormValues) => {
    let endpoint = '/getPeople';
    let params = new URLSearchParams();
    
    if (isNLP) {
      endpoint = '/getPeopleByNLP';
      params.append('statement', data.nlpQuery || '');
    } else {
      if (data.keys) params.append("keys", data.keys);
      if (data.loc) params.append("loc", data.loc);
      if (data.alum) params.append("alum", data.alum);
    }

    console.log("Fetching from:", endpoint);
    
    try {
      const response = await fetch(`${endpoint}?${params.toString()}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const searchData = await response.json();
      
      // Save search to history
      const timestamp = new Date().toISOString();
      const historyItem = {
        id: timestamp,
        query: isNLP ? data.nlpQuery : `${data.keys} ${data.loc} ${data.alum}`.trim(),
        timestamp,
        results: searchData.response?.results?.length || 0
      };

      const existingHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      localStorage.setItem("searchHistory", JSON.stringify([historyItem, ...existingHistory]));

      // Navigate to results with the search data
      navigate(`/results?${params.toString()}`, { state: { searchData } });
      
      toast({
        title: "Searching...",
        description: "Finding alumni matching your criteria",
      });
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch alumni data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="relative"
          style={{
            borderWidth: '3px',
            borderImageSlice: '1',
            borderStyle: 'solid',
            borderImage: 'linear-gradient(90deg, var(--ucla-blue) 50%, var(--ucla-gold) 50%) 1',
            borderRadius: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(39, 116, 174, 0.1), 0 2px 4px -1px rgba(255, 209, 0, 0.06)'
          }}>
          <div className={`flex flex-col ${isExpanded ? 'gap-4 p-6' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isNLP}
                  onCheckedChange={setIsNLP}
                  id="nlp-mode"
                />
                <FormLabel htmlFor="nlp-mode" className="text-sm">
                  {isNLP ? "NLP Search" : "Standard Search"}
                </FormLabel>
              </div>
            </div>

            {isNLP ? (
              <FormField
                control={form.control}
                name="nlpQuery"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Describe what you're looking for..."
                        className="w-full h-24 pl-8 pr-16 text-xl bg-background/20 backdrop-blur-sm rounded-3xl truncate"
                        onFocus={() => setIsExpanded(true)}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="keys"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Find UCLA alumni by name, major..."
                          className={`w-full ${isExpanded ? 'h-14' : 'h-24'} pl-8 pr-16 text-xl bg-background/20 backdrop-blur-sm rounded-3xl truncate`}
                          onFocus={() => setIsExpanded(true)}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {isExpanded && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="loc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Location</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter location..." 
                                className="bg-background/20 backdrop-blur-sm rounded-xl"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="alum"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Alumni Of</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter university name..."
                                className="bg-background/20 backdrop-blur-sm rounded-xl"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {!isExpanded && (
              <Button
                type="submit"
                size="icon"
                className="absolute right-4 w-16 h-16 rounded-xl bg-white/10 hover:bg-white/20"
              >
                <Search className="h-8 w-8" />
              </Button>
            )}

            {isExpanded && (
              <div className="flex justify-end mt-2">
                <Button 
                  type="submit" 
                  className="bg-ucla-blue hover:bg-ucla-blue/80 text-white px-8 py-6 rounded-xl"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
