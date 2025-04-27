
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, MapPin, Briefcase, GraduationCap, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Sample data based on the provided structure
const sampleData = {
  results: [
    {
      profile: {
        id: "1",
        name: "Jennifer Patel",
        location: "Los Angeles, CA",
        headline: "Senior Software Engineer at TechCorp",
        description: "Passionate about creating scalable web applications and mentoring junior developers. Specialized in React, Node.js, and cloud architecture.",
        title: "Senior Software Engineer",
        profile_picture_url: "https://i.pravatar.cc/150?u=jennifer",
        linkedin_url: "https://linkedin.com/in/jennifer-patel"
      },
      experience: [
        {
          title: "Senior Software Engineer",
          company_name: "TechCorp",
          start_date: "2021-06",
          end_date: "Present",
          description: "Leading a team of 5 engineers developing microservices architecture for enterprise clients.",
          location: "Los Angeles, CA",
          company_logo: "https://logo.clearbit.com/techcorp.example"
        },
        {
          title: "Software Engineer",
          company_name: "StartupX",
          start_date: "2018-03",
          end_date: "2021-05",
          description: "Developed full-stack applications using React and Node.js.",
          location: "San Francisco, CA",
          company_logo: "https://logo.clearbit.com/startupx.example"
        }
      ],
      education: [
        {
          degree: "Master of Science",
          field_of_study: "Computer Science",
          school_name: "San Jose State University",
          start_date: "2016",
          end_date: "2018",
          description: "Focused on distributed systems and machine learning.",
          school_logo: "https://logo.clearbit.com/sjsu.edu"
        },
        {
          degree: "Bachelor of Science",
          field_of_study: "Computer Engineering",
          school_name: "University of California, Davis",
          start_date: "2012",
          end_date: "2016",
          description: "Dean's list for 6 consecutive semesters.",
          school_logo: "https://logo.clearbit.com/ucdavis.edu"
        }
      ]
    },
    {
      profile: {
        id: "2",
        name: "Michael Rodriguez",
        location: "Los Angeles, CA",
        headline: "Frontend Developer at StreamMedia",
        description: "UI/UX enthusiast with a passion for creating intuitive user interfaces. Experienced in React, Vue, and modern CSS frameworks.",
        title: "Frontend Developer",
        profile_picture_url: "https://i.pravatar.cc/150?u=michael",
        linkedin_url: "https://linkedin.com/in/michael-rodriguez"
      },
      experience: [
        {
          title: "Frontend Developer",
          company_name: "StreamMedia",
          start_date: "2020-01",
          end_date: "Present",
          description: "Developing responsive user interfaces for video streaming platforms.",
          location: "Los Angeles, CA",
          company_logo: "https://logo.clearbit.com/streammedia.example"
        },
        {
          title: "Junior Web Developer",
          company_name: "WebSolutions Inc.",
          start_date: "2018-07",
          end_date: "2019-12",
          description: "Created websites and web applications for small businesses.",
          location: "San Jose, CA",
          company_logo: "https://logo.clearbit.com/websolutions.example"
        }
      ],
      education: [
        {
          degree: "Bachelor of Science",
          field_of_study: "Software Engineering",
          school_name: "San Jose State University",
          start_date: "2014",
          end_date: "2018",
          description: "Graduated with honors. Focused on web technologies.",
          school_logo: "https://logo.clearbit.com/sjsu.edu"
        }
      ]
    }
  ],
  total: 2,
  query: "Find software alumni from SJSU in LA",
  error: null
};

const Results = () => {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("experience");
  
  const selectedProfile = selectedProfileId 
    ? sampleData.results.find(result => result.profile.id === selectedProfileId)
    : null;
    
  const handleBack = () => {
    setSelectedProfileId(null);
  };
  
  // Format date to more readable format
  const formatDate = (dateStr: string) => {
    if (dateStr === "Present") return "Present";
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <ThemeToggle />
      
      {/* Header Section */}
      <header className="max-w-7xl mx-auto py-8 animate-fadeIn">
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Link>
        
        <div className="glass p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold">{sampleData.query}</h1>
          <p className="text-muted-foreground mt-2">Found {sampleData.total} matching alumni</p>
          <Progress value={(sampleData.total / 10) * 100} className="mt-4 h-2" />
        </div>
      </header>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto mt-8">
        {selectedProfileId === null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {sampleData.results.map((result) => (
              <Card key={result.profile.id} className="overflow-hidden hover:shadow-md transition-all duration-300 glass">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="w-16 h-16 border-2 border-primary">
                    <AvatarImage src={result.profile.profile_picture_url} alt={result.profile.name} />
                    <AvatarFallback>{result.profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <CardTitle className="text-xl">{result.profile.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1 inline" />
                      {result.profile.location}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{result.profile.headline}</p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {result.profile.description}
                  </p>
                  
                  <div className="mt-4">
                    <p className="text-sm font-semibold flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1.5" />
                      {result.education[0].degree}, {result.education[0].field_of_study}
                    </p>
                    <p className="text-xs text-muted-foreground ml-5.5">
                      {result.education[0].school_name}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button 
                    variant="default" 
                    className="w-full" 
                    onClick={() => setSelectedProfileId(result.profile.id)}
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="animate-fadeIn">
            {selectedProfile && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Sidebar */}
                <Card className="lg:col-span-1 glass">
                  <CardHeader>
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                        <AvatarImage src={selectedProfile.profile.profile_picture_url} alt={selectedProfile.profile.name} />
                        <AvatarFallback>{selectedProfile.profile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-2xl">{selectedProfile.profile.name}</CardTitle>
                      <CardDescription className="flex items-center justify-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedProfile.profile.location}
                      </CardDescription>
                      <Badge className="mt-3">{selectedProfile.profile.title}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center mb-4">{selectedProfile.profile.description}</p>
                    <Button variant="outline" className="w-full mb-2" asChild>
                      <a href={selectedProfile.profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                        LinkedIn Profile
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="secondary" className="w-full" onClick={handleBack}>
                      Back to Results
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Detail Section */}
                <Card className="lg:col-span-2 glass">
                  <CardHeader className="pb-2">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger value="experience" className="flex-1">
                          <Briefcase className="h-4 w-4 mr-2" /> Experience
                        </TabsTrigger>
                        <TabsTrigger value="education" className="flex-1">
                          <GraduationCap className="h-4 w-4 mr-2" /> Education
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="experience" className="space-y-6 mt-0">
                      {selectedProfile.experience.map((exp, index) => (
                        <div key={index} className="animate-fadeIn">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src={exp.company_logo} alt={exp.company_name} />
                              <AvatarFallback>{exp.company_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold">{exp.title}</h3>
                              <p className="text-sm text-muted-foreground">{exp.company_name} · {exp.location}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                              </p>
                              <p className="mt-2 text-sm">{exp.description}</p>
                            </div>
                          </div>
                          {index < selectedProfile.experience.length - 1 && (
                            <Separator className="my-4" />
                          )}
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="education" className="space-y-6 mt-0">
                      {selectedProfile.education.map((edu, index) => (
                        <div key={index} className="animate-fadeIn">
                          <div className="flex items-start">
                            <Avatar className="h-10 w-10 mr-4">
                              <AvatarImage src={edu.school_logo} alt={edu.school_name} />
                              <AvatarFallback>{edu.school_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h3 className="font-semibold">{edu.school_name}</h3>
                              <p className="text-sm">{edu.degree}, {edu.field_of_study}</p>
                              <p className="text-xs text-muted-foreground">
                                {edu.start_date} - {edu.end_date}
                              </p>
                              <p className="mt-2 text-sm">{edu.description}</p>
                            </div>
                          </div>
                          {index < selectedProfile.education.length - 1 && (
                            <Separator className="my-4" />
                          )}
                        </div>
                      ))}
                    </TabsContent>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Results;
