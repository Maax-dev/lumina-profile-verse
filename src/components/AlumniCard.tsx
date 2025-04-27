
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
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
      className="group relative transition-all duration-300 cursor-pointer hover:shadow-xl shadow-md overflow-hidden hover:scale-105"
      style={{
        borderWidth: '3px',
        borderImageSlice: '1',
        borderStyle: 'solid',
        borderImage: 'linear-gradient(90deg, var(--ucla-blue) 50%, var(--ucla-gold) 50%) 1',
        boxShadow: '0 4px 6px -1px rgba(39, 116, 174, 0.1), 0 2px 4px -1px rgba(255, 209, 0, 0.06)'
      }}
      onClick={() => navigate(`/profile/${profile.id}`, { state: { profile, education, experience } })}
    >
      <div className="p-4">
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

        <div className="space-y-2 overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-4">
          <p className="text-xs">
            {education[0]?.degree} in {education[0]?.field_of_study}
          </p>
          {experience[0] && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-3 w-3 text-muted-foreground shrink-0" />
              <p className="text-xs truncate">
                {experience[0].title} at {experience[0].company_name}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
