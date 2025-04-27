
import { useLocation, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const AlumniProfile = () => {
  const { state: profile } = useLocation();
  const isMobile = useIsMobile();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ucla-blue to-ucla-gold p-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/results" 
          className="inline-flex items-center px-4 py-2 mb-6 rounded-lg bg-gradient-to-r from-ucla-blue to-ucla-gold text-white hover:opacity-90 transition-all"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          <span className="font-medium">Back to Results</span>
        </Link>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20">
          <CardContent className="p-8">
            <div className={`flex ${isMobile ? 'flex-col' : 'items-start gap-6'}`}>
              <Avatar className="h-24 w-24 ring-4 ring-white/20">
                <AvatarImage src={profile.profile.profile_picture_url} alt={profile.profile.name} />
                <AvatarFallback>{profile.profile.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-4 flex-1">
                <div>
                  <h1 className="text-3xl font-bold text-white">{profile.profile.name}</h1>
                  <p className="text-white/80">{profile.profile.headline}</p>
                  <p className="text-white/60">{profile.profile.location}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white/90 mt-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-4 text-ucla-gold">Education</h2>
                      {profile.education.map((edu: any, index: number) => (
                        <div key={index} className="mb-4 p-4 bg-white/5 rounded-lg">
                          <p className="font-medium">{edu.degree} in {edu.field_of_study}</p>
                          <p className="text-sm text-white/70">{edu.school_name}</p>
                          <p className="text-sm text-white/70">{edu.start_date} - {edu.end_date}</p>
                          {edu.description && (
                            <p className="text-sm text-white/70 mt-2">{edu.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold mb-4 text-ucla-gold">Experience</h2>
                      {profile.experience.map((exp: any, index: number) => (
                        <div key={index} className="mb-4 p-4 bg-white/5 rounded-lg">
                          <p className="font-medium">{exp.title}</p>
                          <p className="text-sm text-white/70">{exp.company_name}</p>
                          <p className="text-sm text-white/70">{exp.start_date} - {exp.end_date}</p>
                          <p className="text-sm text-white/70">{exp.location}</p>
                          {exp.description && (
                            <p className="text-sm text-white/70 mt-2">{exp.description}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {profile.profile.linkedin_url && (
                      <div>
                        <h2 className="text-lg font-semibold mb-4 text-ucla-gold">Connect</h2>
                        <a 
                          href={profile.profile.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white hover:text-ucla-gold transition-colors"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AlumniProfile;
