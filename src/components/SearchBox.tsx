
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

// Mock data to use when API is not available
const MOCK_SEARCH_RESULTS = {
  response: {
    results: [
      {
        id: "1",
        name: "Jane Smith",
        title: "Software Engineer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        education: [{ school: "UCLA", degree: "Computer Science", year: "2020" }],
        skills: ["React", "TypeScript", "Node.js"],
        image: "https://i.pravatar.cc/150?img=1"
      },
      {
        id: "2",
        name: "John Doe",
        title: "Product Manager",
        company: "Innovation Labs",
        location: "New York, NY",
        education: [{ school: "UCLA", degree: "Business Administration", year: "2018" }],
        skills: ["Product Strategy", "Agile", "Market Research"],
        image: "https://i.pravatar.cc/150?img=2"
      },
      {
        id: "3",
        name: "Emily Johnson",
        title: "Data Scientist",
        company: "Data Insights Corp",
        location: "Boston, MA",
        education: [{ school: "UCLA", degree: "Statistics", year: "2021" }],
        skills: ["Python", "Machine Learning", "Data Analysis"],
        image: "https://i.pravatar.cc/150?img=3"
      }
    ]
  }
};

export function SearchBox() {
  const navigate = useNavigate();
  const [isNLP, setIsNLP] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

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
    setIsSearching(true);
    let endpoint = '/getPeople';
    let params = new URLSearchParams();

    try {
      if (isNLP) {
        endpoint = '/getPeopleByNLP';
        params.append('statement', data.nlpQuery || '');
      } else {
        if (data.keys) params.append("keys", data.keys);
        if (data.loc) params.append("loc", data.loc);
        if (data.alum) params.append("alum", data.alum);
      }

      console.log("Fetching from:", endpoint);
      
      let searchData;
      
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
        
        searchData = await response.json();
      } catch (error) {
        console.error("API Error:", error);
        // Use mock data when API fails
        searchData = MOCK_SEARCH_RESULTS;
        toast({
          title: "Using demo data",
          description: "Couldn't connect to the backend, using sample data instead.",
          variant: "default",
        });
      }

      const timestamp = new Date().toISOString();
      const historyItem = {
        id: timestamp,
        query: isNLP ? data.nlpQuery : `${data.keys} ${data.loc} ${data.alum}`.trim(),
        timestamp,
        results: searchData.response?.results?.length || 0
      };

      const existingHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      localStorage.setItem("searchHistory", JSON.stringify([historyItem, ...existingHistory]));

      navigate(`/results?${params.toString()}`, { state: { searchData, endpoint } });
      
      if (!searchData.response || searchData === MOCK_SEARCH_RESULTS) {
        toast({
          title: "Demo Mode",
          description: "Showing sample alumni data",
        });
      } else {
        toast({
          title: "Searching...",
          description: "Finding alumni matching your criteria",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Failed to fetch alumni data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto">
        <div 
          className={`relative p-1 rounded-2xl shadow-lg ${isNLP ? 
            'bg-gradient-to-r from-ucla-blue to-ucla-gold' : 
            'bg-gradient-to-r from-ucla-blue to-ucla-gold'}`}
          style={{ padding: '3px' }}
        >
          <div className="flex flex-col gap-4 p-4 bg-background rounded-2xl min-h-[320px]">
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center gap-3">
                <Switch
                  checked={isNLP}
                  onCheckedChange={setIsNLP}
                  id="nlp-mode"
                  className="data-[state=checked]:bg-ucla-gold data-[state=checked]:dark:bg-ucla-gold dark:data-[state=unchecked]:bg-gray-700"
                />
                <FormLabel htmlFor="nlp-mode" className="text-sm font-medium">
                  {isNLP ? "NLP Search" : "Standard Search"}
                </FormLabel>
              </div>
            </div>

            <div className="space-y-4 flex-grow">
              {isNLP ? (
                <FormField
                  control={form.control}
                  name="nlpQuery"
                  render={({ field }) => (
                    <FormItem className="h-[180px] flex flex-col justify-center">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Describe what you're looking for..."
                          className="h-14 px-6 text-lg bg-background/20 backdrop-blur-sm rounded-xl
                            border-2 border-ucla-blue/50 dark:border-ucla-lighter-blue/50 
                            shadow-md shadow-ucla-blue/20 dark:shadow-ucla-lighter-blue/20 
                            focus:border-ucla-blue dark:focus:border-ucla-lighter-blue
                            transition-all duration-200"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                <div className="h-[180px] flex flex-col justify-between">
                  <FormField
                    control={form.control}
                    name="keys"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter Keywords"
                            className="h-14 px-6 text-lg bg-background/20 backdrop-blur-sm rounded-xl 
                              border-2 border-ucla-blue/50 dark:border-ucla-lighter-blue/50 
                              shadow-md shadow-ucla-blue/20 dark:shadow-ucla-lighter-blue/20 
                              focus:border-ucla-blue dark:focus:border-ucla-lighter-blue
                              transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="loc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium ml-1 mb-2">Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter location..."
                              className="h-14 bg-background/20 backdrop-blur-sm rounded-xl 
                                border-2 border-ucla-blue/50 dark:border-ucla-lighter-blue/50 
                                shadow-md shadow-ucla-blue/20 dark:shadow-ucla-lighter-blue/20 
                                focus:border-ucla-blue dark:focus:border-ucla-lighter-blue
                                transition-all duration-200"
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
                          <FormLabel className="text-sm font-medium ml-1 mb-2">Alumni Of</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter university name..."
                              className="h-14 bg-background/20 backdrop-blur-sm rounded-xl 
                                border-2 border-ucla-blue/50 dark:border-ucla-lighter-blue/50 
                                shadow-md shadow-ucla-blue/20 dark:shadow-ucla-lighter-blue/20 
                                focus:border-ucla-blue dark:focus:border-ucla-lighter-blue
                                transition-all duration-200"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <Button 
                type="submit"
                size="icon"
                className="w-12 h-12 rounded-full bg-ucla-blue hover:bg-ucla-blue/90 dark:bg-ucla-lighter-blue dark:hover:bg-ucla-lighter-blue/90 text-white"
                disabled={isSearching}
              >
                {isSearching ? (
                  <div className="animate-spin h-5 w-5 border-2 border-t-transparent rounded-full" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
