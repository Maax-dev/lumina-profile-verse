import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

const AlumniProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const profile = state?.profile;
  const searchData = state?.searchData;
  const endpoint = state?.endpoint;

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center text-center text-foreground">Profile not found</div>;
  }

  const handleBack = () => {
    navigate("/results", { state: { searchData, endpoint } });
  };

  return (
    <div className="min-h-screen p-4 bg-background overflow-hidden" style={{ scrollBehavior: "smooth" }}>
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6 animate-fadeAndSlideUp">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-ucla-blue hover:opacity-90 transition-all shadow-md"
            >
              <ChevronLeft className="mr-2 h-4 w-4 text-white" />
              <span className="text-white font-medium">Back to Results</span> {/* Always white */}
            </button>
          </div>
          <ThemeToggle />
        </header>

        <div className="rounded-xl bg-white dark:bg-white/10 p-8 shadow-2xl animate-scaleIn">
          <div className={`flex ${isMobile ? "flex-col items-center text-center" : "items-start gap-8"}`}>
            <Avatar className="h-32 w-32 ring-4 ring-white/20 shadow-md">
              <AvatarImage src={profile.profile_picture_url} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>

            <div className="space-y-4 flex-1 mt-6 md:mt-0 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                  <p className="text-muted-foreground">{profile.headline}</p>
                  <p className="text-muted-foreground">{profile.location}</p>
                </div>

                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 rounded-lg bg-ucla-gold text-ucla-blue font-semibold hover:opacity-90 transition-all shadow-md"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Connect
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground mt-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-ucla-gold">Education</h2>
                    {state.education?.map((edu: any, index: number) => (
                      <div key={index} className="mb-4 p-4 rounded-lg bg-white/70 dark:bg-white/10 shadow-md">
                        <p className="font-medium">{edu.degree} in {edu.field_of_study}</p>
                        <p className="text-sm text-muted-foreground">{edu.school_name}</p>
                        <p className="text-sm text-muted-foreground">{edu.start_date} - {edu.end_date}</p>
                        {edu.description && (
                          <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-ucla-gold">Experience</h2>
                    {state.experience?.map((exp: any, index: number) => (
                      <div key={index} className="mb-4 p-4 rounded-lg bg-white/70 dark:bg-white/10 shadow-md">
                        <p className="font-medium">{exp.title}</p>
                        <p className="text-sm text-muted-foreground">{exp.company_name}</p>
                        <p className="text-sm text-muted-foreground">{exp.start_date} - {exp.end_date}</p>
                        <p className="text-sm text-muted-foreground">{exp.location}</p>
                        {exp.description && (
                          <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;
