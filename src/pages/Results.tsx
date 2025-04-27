
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AlumniCard } from "@/components/AlumniCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Results = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sampleData.total / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = sampleData.results.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <ThemeToggle />
      
      <header className="max-w-4xl mx-auto py-8 animate-fadeIn">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Link>
        
        <div className="glass p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold">{sampleData.query}</h1>
          <p className="text-muted-foreground mt-2">Found {sampleData.total} matching alumni</p>
          <Progress value={(sampleData.total / 100) * 100} className="mt-4 h-2" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-8 space-y-4">
        {currentResults.map((result) => (
          <div key={result.profile.id} className="animate-fadeIn">
            <AlumniCard 
              profile={result.profile}
              education={result.education}
              experience={result.experience}
            />
          </div>
        ))}
        
        <Pagination className="mt-8">
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
      </main>
    </div>
  );
};

export default Results;
