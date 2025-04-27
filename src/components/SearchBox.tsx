
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const searchSchema = z.object({
  keys: z.string().optional(),
  loc: z.string().optional(),
  alum: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export function SearchBox() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keys: "",
      loc: "",
      alum: "",
    },
  });

  const onSubmit = async (data: SearchFormValues) => {
    const params = new URLSearchParams();
    if (data.keys) params.append("keys", data.keys);
    if (data.loc) params.append("loc", data.loc);
    if (data.alum) params.append("alum", data.alum);
    
    navigate(`/results?${params.toString()}`);
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
            <div className="flex items-center">
              <FormField
                control={form.control}
                name="keys"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Find UCLA alumni by name, major, or location..."
                        className={`w-full ${isExpanded ? 'h-14' : 'h-24'} pl-8 pr-16 text-xl bg-background/20 backdrop-blur-sm rounded-3xl dark:placeholder:text-white/70 dark:text-white placeholder:text-foreground/70 text-foreground border-none`}
                        onFocus={() => setIsExpanded(true)}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {!isExpanded && (
                <Button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  size="icon"
                  className="absolute right-4 w-16 h-16 rounded-xl bg-white/10 hover:bg-white/20 dark:text-white text-foreground"
                >
                  <Search className="h-8 w-8" />
                </Button>
              )}
            </div>
            
            {isExpanded && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="loc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80 dark:text-white/80">Location</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter location..." 
                            className="bg-background/20 backdrop-blur-sm rounded-xl dark:placeholder:text-white/50 dark:text-white"
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
                        <FormLabel className="text-foreground/80 dark:text-white/80">Alumni Of</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter university name..."
                            className="bg-background/20 backdrop-blur-sm rounded-xl dark:placeholder:text-white/50 dark:text-white"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    type="submit" 
                    className="bg-ucla-blue hover:bg-ucla-blue/80 text-white px-8 py-6 rounded-xl"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    Search
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
