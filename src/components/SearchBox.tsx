
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
import { getMockSearchResults } from "@/utils/mockData";

const searchSchema = z.object({
  keys: z.string().optional(),
  loc: z.string().optional(),
  alum: z.string().optional(),
  nlpQuery: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function SearchBox() {
  const navigate = useNavigate();
  const [isNLP, setIsNLP] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    let queryDisplay = '';

    setIsSubmitting(true);
    
    if (isNLP) {
      endpoint = '/getPeopleByNLP';
      params.append('statement', data.nlpQuery || '');
      queryDisplay = data.nlpQuery || '';
    } else {
      if (data.keys) params.append("keys", data.keys);
      if (data.loc) params.append("loc", data.loc);
      if (data.alum) params.append("alum", data.alum);
      queryDisplay = `${data.keys} ${data.loc} ${data.alum}`.trim();
    }

    console.log("Fetching from:", endpoint);
    
    toast({
      title: "Searching...",
      description: "Finding alumni matching your criteria",
    });

    try {
      const response = await fetch(`${endpoint}?${params.toString()}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // Add a timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000) 
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const searchData = await response.json();

      const timestamp = new Date().toISOString();
      const historyItem = {
        id: timestamp,
        query: queryDisplay,
        timestamp,
        results: searchData.response?.results?.length || 0
      };

      const existingHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      localStorage.setItem("searchHistory", JSON.stringify([historyItem, ...existingHistory]));

      // Navigate with the response data
      navigate(`/results?${params.toString()}`, { state: { searchData, endpoint } });

    } catch (error) {
      console.error("Search error:", error);
      
      // Fallback to mock data when API fails
      const mockResults = getMockSearchResults(queryDisplay);
      
      toast({
        title: "Backend unavailable",
        description: "Using demo data as backend is unavailable",
        variant: "destructive",
      });
      
      // Navigate with mock data
      navigate(`/results?${params.toString()}`, { 
        state: { 
          searchData: { 
            response: mockResults 
          }, 
          endpoint,
          isMockData: true
        } 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto">
        <div className="relative p-1"
          style={{
            borderWidth: '2px',
            borderImageSlice: '1',
            borderStyle: 'solid',
            borderImage: 'linear-gradient(90deg, var(--ucla-blue) 50%, var(--ucla-gold) 50%) 1',
            borderRadius: '1.5rem',
          }}>
          <div className="flex flex-col gap-4 p-4 min-h-[320px]">
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
                            focus:border-ucla-blue dark:focus:border-ucla-lighter-blue"
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
                              focus:border-ucla-blue dark:focus:border-ucla-lighter-blue"
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
                                focus:border-ucla-blue dark:focus:border-ucla-lighter-blue"
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
                                focus:border-ucla-blue dark:focus:border-ucla-lighter-blue"
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
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
