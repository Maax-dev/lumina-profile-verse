import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, History as HistoryIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AlumniCard } from "@/components/AlumniCard";
import { GridControls } from "@/components/GridControls";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const sampleData = {
  results: [
    {
      profile: {
        id: "1",
        name: "Alex Johnson",
        location: "Los Angeles, CA",
        headline: "Software Engineer at Google | SJSU Alumni",
        description: "Passionate about building scalable web applications and machine learning.",
        title: "Software Engineer",
        profile_picture_url: "https://i.pravatar.cc/150?img=1",
        linkedin_url: "https://linkedin.com/in/alexjohnson"
      },
      experience: [
        {
          title: "Software Engineer",
          company_name: "Google",
          start_date: "2021-06",
          end_date: "Present",
          description: "Working on Google Cloud Platform services.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/120px-Google_%22G%22_Logo.svg.png"
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          field_of_study: "Computer Science",
          school_name: "San Jose State University",
          start_date: "2017-09",
          end_date: "2021-05",
          description: "Focus on Software Engineering and Artificial Intelligence",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "2",
        name: "Priya Patel",
        location: "Los Angeles, CA",
        headline: "Frontend Developer at Meta | SJSU Graduate",
        description: "Specializing in React and modern JavaScript frameworks.",
        title: "Frontend Developer",
        profile_picture_url: "https://i.pravatar.cc/150?img=2",
        linkedin_url: "https://linkedin.com/in/priyapatel"
      },
      experience: [
        {
          title: "Frontend Developer",
          company_name: "Meta",
          start_date: "2020-01",
          end_date: "Present",
          description: "Building user interfaces for Facebook products.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/120px-Meta_Platforms_Inc._logo.svg.png"
        }
      ],
      education: [
        {
          degree: "Master of Science",
          field_of_study: "Software Engineering",
          school_name: "San Jose State University",
          start_date: "2018-08",
          end_date: "2020-05",
          description: "Focus on Web Technologies and UX Design",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "3",
        name: "David Garcia",
        location: "Los Angeles, CA",
        headline: "Mobile Developer at Apple | SJSU Alumni",
        description: "iOS and Swift specialist with a passion for creating intuitive mobile experiences.",
        title: "Mobile Developer",
        profile_picture_url: "https://i.pravatar.cc/150?img=3",
        linkedin_url: "https://linkedin.com/in/davidgarcia"
      },
      experience: [
        {
          title: "Mobile Developer",
          company_name: "Apple",
          start_date: "2019-03",
          end_date: "Present",
          description: "Developing iOS applications and frameworks.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/120px-Apple_logo_black.svg.png"
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          field_of_study: "Computer Engineering",
          school_name: "San Jose State University",
          start_date: "2015-09",
          end_date: "2019-05",
          description: "Focus on Mobile Computing and Hardware Integration",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "4",
        name: "Sarah Wilson",
        location: "Los Angeles, CA",
        headline: "Data Scientist at Netflix | SJSU Graduate",
        description: "Machine learning expert specializing in recommendation systems.",
        title: "Data Scientist",
        profile_picture_url: "https://i.pravatar.cc/150?img=4",
        linkedin_url: "https://linkedin.com/in/sarahwilson"
      },
      experience: [
        {
          title: "Data Scientist",
          company_name: "Netflix",
          start_date: "2020-05",
          end_date: "Present",
          description: "Building recommendation algorithms for content delivery.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/120px-Netflix_2015_logo.svg.png"
        }
      ],
      education: [
        {
          degree: "Master of Science",
          field_of_study: "Data Science",
          school_name: "San Jose State University",
          start_date: "2018-09",
          end_date: "2020-05",
          description: "Focus on Machine Learning and Statistical Analysis",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "5",
        name: "James Chen",
        location: "Los Angeles, CA",
        headline: "DevOps Engineer at Amazon | SJSU Alumni",
        description: "Cloud infrastructure specialist with expertise in AWS services.",
        title: "DevOps Engineer",
        profile_picture_url: "https://i.pravatar.cc/150?img=5",
        linkedin_url: "https://linkedin.com/in/jameschen"
      },
      experience: [
        {
          title: "DevOps Engineer",
          company_name: "Amazon",
          start_date: "2018-11",
          end_date: "Present",
          description: "Managing cloud infrastructure and deployment pipelines.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/120px-Amazon_logo.svg.png"
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          field_of_study: "Software Engineering",
          school_name: "San Jose State University",
          start_date: "2014-09",
          end_date: "2018-05",
          description: "Focus on Cloud Computing and System Architecture",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "6",
        name: "Emily Rodriguez",
        location: "Los Angeles, CA",
        headline: "UX Designer at Adobe | SJSU Graduate",
        description: "Creating intuitive user experiences with a focus on accessibility.",
        title: "UX Designer",
        profile_picture_url: "https://i.pravatar.cc/150?img=6",
        linkedin_url: "https://linkedin.com/in/emilyrodriguez"
      },
      experience: [
        {
          title: "UX Designer",
          company_name: "Adobe",
          start_date: "2019-07",
          end_date: "Present",
          description: "Designing user interfaces for Creative Cloud applications.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Adobe_Systems_logo_and_wordmark.svg/120px-Adobe_Systems_logo_and_wordmark.svg.png"
        }
      ],
      education: [
        {
          degree: "Bachelor of Arts",
          field_of_study: "Interactive Design",
          school_name: "San Jose State University",
          start_date: "2015-09",
          end_date: "2019-05",
          description: "Focus on User Experience and Interface Design",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "7",
        name: "Michael Kim",
        location: "Los Angeles, CA",
        headline: "Full Stack Developer at Airbnb | SJSU Alumni",
        description: "Building robust web applications with modern technologies.",
        title: "Full Stack Developer",
        profile_picture_url: "https://i.pravatar.cc/150?img=7",
        linkedin_url: "https://linkedin.com/in/michaelkim"
      },
      experience: [
        {
          title: "Full Stack Developer",
          company_name: "Airbnb",
          start_date: "2020-02",
          end_date: "Present",
          description: "Developing features for the Airbnb platform.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_logo_b%C3%A9lo.svg/120px-Airbnb_logo_b%C3%A9lo.svg.png"
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          field_of_study: "Computer Science",
          school_name: "San Jose State University",
          start_date: "2016-09",
          end_date: "2020-05",
          description: "Focus on Web Development and Database Systems",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "8",
        name: "Rachel Thomas",
        location: "Los Angeles, CA",
        headline: "Product Manager at Microsoft | SJSU Graduate",
        description: "Technical product manager with a background in software development.",
        title: "Product Manager",
        profile_picture_url: "https://i.pravatar.cc/150?img=8",
        linkedin_url: "https://linkedin.com/in/rachelthomas"
      },
      experience: [
        {
          title: "Product Manager",
          company_name: "Microsoft",
          start_date: "2019-09",
          end_date: "Present",
          description: "Managing product development for Microsoft Teams features.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/120px-Microsoft_logo.svg.png"
        }
      ],
      education: [
        {
          degree: "Master of Business Administration",
          field_of_study: "Technology Management",
          school_name: "San Jose State University",
          start_date: "2017-09",
          end_date: "2019-05",
          description: "Focus on Product Management and Technology Strategy",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "9",
        name: "Daniel Martinez",
        location: "Los Angeles, CA",
        headline: "Security Engineer at Cloudflare | SJSU Alumni",
        description: "Cybersecurity specialist with expertise in threat detection and prevention.",
        title: "Security Engineer",
        profile_picture_url: "https://i.pravatar.cc/150?img=9",
        linkedin_url: "https://linkedin.com/in/danielmartinez"
      },
      experience: [
        {
          title: "Security Engineer",
          company_name: "Cloudflare",
          start_date: "2020-04",
          end_date: "Present",
          description: "Developing security solutions for web applications.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cloudflare_Logo.png/120px-Cloudflare_Logo.png"
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          field_of_study: "Cybersecurity",
          school_name: "San Jose State University",
          start_date: "2016-09",
          end_date: "2020-05",
          description: "Focus on Network Security and Ethical Hacking",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "10",
        name: "Jennifer Lee",
        location: "Los Angeles, CA",
        headline: "Machine Learning Engineer at Tesla | SJSU Graduate",
        description: "AI researcher specializing in computer vision and autonomous systems.",
        title: "Machine Learning Engineer",
        profile_picture_url: "https://i.pravatar.cc/150?img=10",
        linkedin_url: "https://linkedin.com/in/jenniferlee"
      },
      experience: [
        {
          title: "Machine Learning Engineer",
          company_name: "Tesla",
          start_date: "2021-01",
          end_date: "Present",
          description: "Developing computer vision algorithms for autonomous driving.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/120px-Tesla_T_symbol.svg.png"
        }
      ],
      education: [
        {
          degree: "PhD",
          field_of_study: "Computer Science",
          school_name: "San Jose State University",
          start_date: "2016-09",
          end_date: "2021-05",
          description: "Research in Machine Learning and Computer Vision",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "11",
        name: "Robert Wang",
        location: "Los Angeles, CA",
        headline: "Game Developer at Electronic Arts | SJSU Alumni",
        description: "Creating immersive gaming experiences with advanced graphics and gameplay.",
        title: "Game Developer",
        profile_picture_url: "https://i.pravatar.cc/150?img=11",
        linkedin_url: "https://linkedin.com/in/robertwang"
      },
      experience: [
        {
          title: "Game Developer",
          company_name: "Electronic Arts",
          start_date: "2019-06",
          end_date: "Present",
          description: "Developing game mechanics and systems for AAA titles.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Electronic_Arts_Logo_2020.svg/120px-Electronic_Arts_Logo_2020.svg.png"
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          field_of_study: "Game Design",
          school_name: "San Jose State University",
          start_date: "2015-09",
          end_date: "2019-05",
          description: "Focus on Game Development and Interactive Media",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    },
    {
      profile: {
        id: "12",
        name: "Sophia Nguyen",
        location: "Los Angeles, CA",
        headline: "Blockchain Developer at Coinbase | SJSU Graduate",
        description: "Developing secure and scalable blockchain solutions.",
        title: "Blockchain Developer",
        profile_picture_url: "https://i.pravatar.cc/150?img=12",
        linkedin_url: "https://linkedin.com/in/sophianguyen"
      },
      experience: [
        {
          title: "Blockchain Developer",
          company_name: "Coinbase",
          start_date: "2020-08",
          end_date: "Present",
          description: "Building cryptocurrency exchange infrastructure.",
          location: "Los Angeles, CA",
          company_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Coinbase_Logo.png/120px-Coinbase_Logo.png"
        }
      ],
      education: [
        {
          degree: "Master of Science",
          field_of_study: "Computer Science",
          school_name: "San Jose State University",
          start_date: "2018-09",
          end_date: "2020-05",
          description: "Focus on Blockchain Technology and Cryptography",
          school_logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/San_Jose_State_University_seal.svg/120px-San_Jose_State_University_seal.svg.png"
        }
      ]
    }
  ],
  total: 25,
  query: "Find software alumni from San Jose State University (SJSU) who are located in Los Angeles (LA)"
};

const Results = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [gridColumns, setGridColumns] = useState(4);
  const [gridRows, setGridRows] = useState(4);
  const itemsPerPage = gridColumns * gridRows;
  const totalPages = Math.ceil(sampleData.total / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResults = sampleData.results.slice(startIndex, endIndex);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    const newSearch = {
      id: Date.now().toString(),
      query: sampleData.query,
      timestamp: new Date().toISOString(),
      results: sampleData.total
    };
    
    const updatedHistory = [newSearch, ...history.slice(0, 9)];
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ucla-blue to-ucla-gold p-4">
      <ThemeToggle />
      
      <header className="max-w-6xl mx-auto py-8 animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-ucla-blue to-ucla-gold hover:opacity-90 transition-opacity"
          >
            <ChevronLeft className="mr-2 h-4 w-4 text-white" />
            <span className="text-white font-medium">Back to Search</span>
          </Link>
          <Link to="/history" className="flex items-center gap-2 text-primary hover:underline">
            <HistoryIcon className="h-4 w-4" />
            View History
          </Link>
        </div>
        
        <div className="glass p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/joe-bruin.png" alt="Joe Bruin" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{sampleData.query}</h1>
              <p className="text-muted-foreground mt-1">Found {sampleData.total} matching alumni</p>
            </div>
          </div>
          <Progress value={(sampleData.total / 100) * 100} className="mt-4 h-2" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        <GridControls onGridChange={(cols, rows) => {
          setGridColumns(cols);
          setGridRows(rows);
        }} />
        
        <div 
          className="grid gap-4" 
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`
          }}
        >
          {currentResults.map((result) => (
            <div key={result.profile.id} className="animate-fadeIn">
              <AlumniCard 
                profile={result.profile}
                education={result.education}
                experience={result.experience}
              />
            </div>
          ))}
        </div>
        
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
