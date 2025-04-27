
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AlumniCardProps {
  profile: {
    id: string;
    name: string;
    location: string;
    headline: string;
    profile_picture_url: string;
    description: string;
  };
  education: {
    end_date: string;
    degree: string;
    field_of_study: string;
  }[];
  experience: {
    title: string;
    company_name: string;
    location: string;
    company_logo: string;
  }[];
}

export function AlumniCard({ profile, education, experience }: AlumniCardProps) {
  const navigate = useNavigate();
  const graduationYear = education[0]?.end_date || "N/A";

  return (
    <Card 
      className="group rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-xl shadow-md"
      style={{
        borderLeft: '4px solid var(--ucla-blue)',
        borderRight: '4px solid var(--ucla-gold)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), -5px 0 15px rgba(39, 116, 174, 0.3), 5px 0 15px rgba(255, 209, 0, 0.3)'
      }}
      onClick={() => navigate(`/profile/${profile.id}`, { state: { profile, education, experience } })}
    >
      {/* Fixed height container to prevent layout shifts */}
      <div className="h-[180px] relative">
        {/* Basic info always visible */}
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/30 transition-all duration-300 group-hover:ring-primary">
              <AvatarImage src={profile.profile_picture_url} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="font-medium text-sm truncate">{profile.name}</h3>
              <p className="text-xs text-muted-foreground truncate">Class of {graduationYear}</p>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-xs flex items-center gap-1 text-muted-foreground truncate">
              <MapPin className="h-3 w-3 shrink-0" /> {profile.location}
            </p>
          </div>
        </CardContent>

        {/* Extended info shown on hover - positioned absolutely at bottom */}
        <div className="absolute left-0 bottom-0 right-0 bg-gradient-to-b from-primary/90 to-primary/80 backdrop-blur-sm p-4 transform translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out border-t border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.15)]">
          <div className="space-y-2 text-white">
            <p className="text-xs truncate">
              {education[0]?.degree} in {education[0]?.field_of_study}
            </p>
            {experience[0] && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-3 w-3 text-white/70 shrink-0" />
                <p className="text-xs truncate">
                  {experience[0].title} at {experience[0].company_name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
