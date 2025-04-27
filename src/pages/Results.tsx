
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, History as HistoryIcon, AlertCircle, Info } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { AlumniCard } from "@/components/AlumniCard";
import { GridControls } from "@/components/GridControls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface AlumniResult {
  profile: {
    id: string;
    name: string;
    location: string;
    headline: string;
    description: string;
    title: string;
    profile_picture_url: string;
    linkedin_url: string;
  };
  experience: Array<{
    title: string;
    company_name: string;
    start_date: string;
    end_date: string;
    description: string;
    location: string;
    company_logo: string;
  }>;
  education: Array<{
    degree: string;
    field_of_study: string;
    school_name: string;
    start_date: string;
    end_date: string;
    description: string;
    school_logo: string;
  }>;
}

interface SearchResponse {
  response: {
    results: AlumniResult[];
    total: number;
    query: string;
  };
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [gridColumns, setGridColumns] = useState(4);
  const [gridRows, setGridRows] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState<SearchResponse["response"] | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const itemsPerPage = gridColumns * gridRows;
  
  useEffect(() => {
    // Add entrance animation class to body on mount
    document.body.classList.add('results-page-enter');
    
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get search parameters from URL
        const keys = searchParams.get("keys") || "";
        const loc = searchParams.get("loc") || "";
        const alum = searchParams.get("alum") || "";
        
        // Build query string
        const queryString = new URLSearchParams({ keys, loc, alum }).toString();
        
        console.log(`Fetching from: /getPeople?${queryString}`);
        
        // Fetch results from API - use relative URL to ensure correct domain
        const response = await fetch(`/getPeople?${queryString}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        // Check if response is OK
        if (!response.ok) {
          console.error("API Error:", response.status, response.statusText);
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        // Verify contentType is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error("Invalid content type:", contentType);
          const text = await response.text();
          console.error("Response body:", text.substring(0, 200) + "...");
          throw new Error("API returned non-JSON response");
        }
        
        const data = await response.json() as SearchResponse;
        
        if (!data || !data.response) {
          console.error("Invalid data structure:", data);
          throw new Error("Invalid response format");
        }
        
        setSearchData(data.response);
        
        toast({
          title: "Search Results",
          description: `Found ${data.response.total} matching alumni`,
        });
        
      } catch (error) {
        console.error("Search error:", error);
        setError(error instanceof Error ? error.message : "Failed to fetch alumni data");
        toast({
          title: "Error",
          description: "Failed to fetch alumni data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
    
    // Set animation as complete after timeout
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      document.body.classList.remove('results-page-enter');
    }, 1500); // Match this to the animation duration
    
    return () => clearTimeout(timer);
  }, [searchParams, toast]);

  // Fallback to sample data if API call fails
  const displayData = searchData || { results: [], total: 0, query: "" };
  const totalPages = Math.max(1, Math.ceil(displayData.total / itemsPerPage));
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = displayData.results.slice(startIndex, endIndex);

  // Get search parameters for displaying query info
  const keys = searchParams.get("keys") || "";
  const loc = searchParams.get("loc") || "";
  const alum = searchParams.get("alum") || "";
  const searchQuery = [
    keys && `"${keys}"`, 
    loc && `in ${loc}`, 
    alum && `from ${alum}`
  ].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen p-4 bg-background overflow-hidden">
      <ThemeToggle />
      
      <header className="max-w-6xl mx-auto py-8 animate-fadeAndSlideUp">
        <div className="flex items-center justify-between mb-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 rounded-lg ucla-button-light dark:ucla-button-dark"
          >
            <ChevronLeft className="mr-2 h-4 w-4 text-white" />
            <span className="text-white font-medium">Back to Search</span>
          </Link>
          <Link to="/history" className="flex items-center gap-2 text-primary hover:underline">
            <HistoryIcon className="h-4 w-4" />
            View History
          </Link>
        </div>
        
        <div className="glass p-6 rounded-lg shadow-lg animate-scaleIn">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/joe-bruin.png" alt="Joe Bruin" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{searchQuery || "Search results"}</h1>
              <p className="text-muted-foreground mt-1">
                {isLoading ? "Searching..." : `Found ${displayData.total} matching alumni`}
              </p>
            </div>
          </div>
          {isLoading ? (
            <Progress value={50} className="mt-4 h-2" />
          ) : (
            <Progress value={(displayData.total / 100) * 100} className="mt-4 h-2" />
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
              <div className="mt-2">
                <p className="text-sm">
                  Try refreshing the page or modifying your search criteria. If the problem persists, 
                  please check the backend server connection.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}
        
        <GridControls onGridChange={(cols, rows) => {
          setGridColumns(cols);
          // Limit rows to a maximum of 5
          setGridRows(Math.min(rows, 5));
        }} />
        
        {isLoading ? (
          <div className="grid gap-8" style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${Math.min(gridRows, 5)}, auto)`,
          }}>
            {Array.from({ length: itemsPerPage }).map((_, idx) => (
              <Card key={idx} className="h-64 animate-pulse" />
            ))}
          </div>
        ) : currentResults.length > 0 ? (
          <div 
            className="grid gap-8" 
            style={{
              gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${Math.min(gridRows, 5)}, auto)`,
              gridAutoRows: 'auto'
            }}
          >
            {currentResults.map((result, idx) => (
              <div 
                key={result.profile.id} 
                className={`animate-fadeAndSlideUp`}
                style={{ animationDelay: `${100 + idx * 50}ms` }}
              >
                <AlumniCard 
                  profile={result.profile}
                  education={result.education}
                  experience={result.experience}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">Try modifying your search criteria</p>
            
            {!error && keys && (
              <Alert className="mt-6 max-w-lg mx-auto">
                <Info className="h-4 w-4" />
                <AlertTitle>Search Tips</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Try using more general keywords</li>
                    <li>Check for spelling errors</li>
                    <li>Leave some fields empty to broaden your search</li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        
        {!isLoading && displayData.total > 0 && (
          <Pagination className="mt-8 animate-fadeAndSlideUp" style={{ animationDelay: "600ms" }}>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
};

export default Results;
