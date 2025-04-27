import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation, Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AlumniCard } from "@/components/AlumniCard";
import { Card } from "@/components/ui/card";
import { GridControls } from "@/components/GridControls";
import { Progress } from "@/components/ui/progress";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ChevronLeft, History as HistoryIcon, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LoadingState from "@/components/LoadingState";

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
  experience: Array<any>;
  education: Array<any>;
}

interface SearchResponse {
  response?: {
    results: AlumniResult[];
    total: number;
    query: string;
  };
  results?: AlumniResult[];
  total?: number;
  query?: string;
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [gridColumns, setGridColumns] = useState(4);
  const [gridRows, setGridRows] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = gridColumns * gridRows;

  const usedEndpoint = location.state?.endpoint || (searchParams.get('statement') ? '/getPeopleByNLP' : '/getPeople');

  useEffect(() => {
    document.body.classList.add('results-page-enter');

    const cachedResults = location.state?.searchData;

    if (cachedResults) {
      console.log("Loading cached search results from navigation state");
      setTimeout(() => {
        setSearchData(cachedResults.response ? cachedResults.response : cachedResults);
        setIsLoading(false);
      }, 2000);
    } else {
      const fetchResults = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const keys = searchParams.get("keys") || "";
          const loc = searchParams.get("loc") || "";
          const alum = searchParams.get("alum") || "";
          const statement = searchParams.get("statement") || "";

          let queryString = "";
          if (usedEndpoint === "/getPeopleByNLP") {
            queryString = new URLSearchParams({ statement }).toString();
          } else {
            queryString = new URLSearchParams({ keys, loc, alum }).toString();
          }

          console.log(`Fetching from: ${usedEndpoint}?${queryString}`);

          const response = await fetch(`${usedEndpoint}?${queryString}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          
          setTimeout(() => {
            setSearchData(data.response ? data.response : data);
            setIsLoading(false);
            
            toast({
              title: "Search Results",
              description: `Found ${(data.response?.total || data.results?.length || 0)} matching alumni`,
            });
          }, 2000);

        } catch (error) {
          console.error("Search error:", error);
          setError(error instanceof Error ? error.message : "Failed to fetch alumni data");
          setIsLoading(false);
          
          toast({
            title: "Error",
            description: "Failed to fetch alumni data. Please try again.",
            variant: "destructive",
          });
        }
      };

      fetchResults();
    }

    const timer = setTimeout(() => {
      setAnimationComplete(true);
      document.body.classList.remove('results-page-enter');
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams, toast, location.state, usedEndpoint]);

  const displayData = searchData || { results: [], total: 0, query: "" };
  const resultsArray = displayData.results || [];
  
  const validResults = resultsArray.filter(item => item && item.profile && item.profile.id);
  
  const uniqueResults = Array.from(new Map(validResults.map(item => [item.profile.id, item])).values());
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = uniqueResults.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(uniqueResults.length / itemsPerPage));

  const keys = searchParams.get("keys") || "";
  const loc = searchParams.get("loc") || "";
  const alum = searchParams.get("alum") || "";
  const searchQuery = [
    keys && `"${keys}"`,
    loc && `in ${loc}`,
    alum && `from ${alum}`
  ].filter(Boolean).join(" ");

  if (isLoading) {
    return <LoadingState />;
  }

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
          <Link 
            to="/history" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-ucla-blue/20 dark:bg-ucla-lighter-blue/20 hover:bg-ucla-blue/30 dark:hover:bg-ucla-lighter-blue/30 transition-colors text-ucla-blue dark:text-ucla-lighter-blue"
          >
            <HistoryIcon className="h-4 w-4" />
            View History
          </Link>
        </div>

        <div className="glass p-6 rounded-lg shadow-lg animate-scaleIn"
             style={{ 
               borderWidth: '3px', 
               borderImageSlice: '1',
               borderStyle: 'solid',
               borderImage: 'linear-gradient(90deg, var(--ucla-blue) 50%, var(--ucla-gold) 50%) 1',
               borderRadius: '1rem'
             }}>
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{searchQuery || "Search results"}</h1>
              <p className="text-muted-foreground mt-1">
                Found {uniqueResults.length} matching alumni
              </p>
            </div>
          </div>
          <Progress value={100} className="mt-4 h-2 bg-ucla-blue/20 dark:bg-ucla-lighter-blue/20" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {uniqueResults.length === 0 && !isLoading && !error && (
          <Alert variant="default" className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>No results found</AlertTitle>
            <AlertDescription>Try modifying your search criteria</AlertDescription>
          </Alert>
        )}

        <GridControls onGridChange={(cols, rows) => {
          setGridColumns(cols);
          setGridRows(Math.min(rows, 5));
        }} />

        {currentResults.length > 0 ? (
          <div className="grid gap-8" style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${Math.min(gridRows, 5)}, auto)`,
            gridAutoRows: 'auto'
          }}>
            {currentResults.map((result, idx) => (
              <div
                key={result.profile.id}
                className="animate-fadeAndSlideUp cursor-pointer"
                style={{ animationDelay: `${100 + idx * 50}ms` }}
                onClick={() => navigate(`/profile/${result.profile.id}`, {
                  state: {
                    profile: result.profile,
                    education: result.education,
                    experience: result.experience,
                    searchData: searchData,
                    endpoint: usedEndpoint
                  }
                })}
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
          </div>
        )}

        {uniqueResults.length > 0 && (
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
