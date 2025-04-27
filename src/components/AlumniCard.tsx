
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
      className="group relative overflow-hidden transition-all duration-300 cursor-pointer bg-white/10 backdrop-blur-sm border border-white hover:border-white/40"
      style={{ height: "100px", minHeight: "100px", maxHeight: "100px" }}
      onClick={() => navigate(`/profile/${profile.id}`, { state: { profile, education, experience } })}
    >
      <CardContent className="p-4 h-full">
        <div className="flex flex-col h-full relative">
          {/* Always visible content */}
          <div className="flex items-center gap-3 min-h-[48px]">
            <Avatar className="h-10 w-10 shrink-0 ring-2 ring-white/20 transition-all duration-300 group-hover:ring-4">
              <AvatarImage src={profile.profile_picture_url} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="font-medium text-sm text-white truncate group-hover:underline">{profile.name}</h3>
              <p className="text-xs text-white/70 truncate">Class of {graduationYear}</p>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-white/70 flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0" /> {profile.location}
            </p>
          </div>

          {/* Expandable content on hover */}
          <div className="absolute top-0 left-0 w-full h-full pt-4 pl-4 pr-4 pb-4 bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-[35%] overflow-hidden">
            <div className="flex items-center gap-3 min-h-[48px] mb-3">
              <Avatar className="h-10 w-10 shrink-0 ring-2 ring-white/20">
                <AvatarImage src={profile.profile_picture_url} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h3 className="font-medium text-sm text-white truncate">{profile.name}</h3>
                <p className="text-xs text-white/70 truncate">Class of {graduationYear}</p>
              </div>
            </div>
            
            <div className="space-y-2 mt-2">
              <p className="text-xs text-white/70 truncate">
                {education[0]?.degree} in {education[0]?.field_of_study}
              </p>
              {experience[0] && (
                <div className="flex items-center gap-2">
                  <Briefcase className="h-3 w-3 text-white/70 shrink-0" />
                  <p className="text-sm text-white/70 truncate">
                    {experience[0].title} at {experience[0].company_name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
