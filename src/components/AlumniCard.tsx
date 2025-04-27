
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
      className="group relative overflow-hidden transition-all duration-300 cursor-pointer border-l-ucla-blue border-r-ucla-gold hover:shadow-xl"
      onClick={() => navigate(`/profile/${profile.id}`, { state: { profile, education, experience } })}
    >
      {/* Fixed height container that will expand on hover */}
      <div className="transition-all duration-300 group-hover:pb-24 h-[100px]">
        <CardContent className="p-4 h-full relative">
          {/* Basic info shown by default */}
          <div className="flex flex-col h-full">
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
          </div>

          {/* Extended info that appears on hover */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-primary/90 to-primary/80 backdrop-blur-sm translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 p-4 border-t border-white/10">
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
        </CardContent>
      </div>
    </Card>
  );
}
