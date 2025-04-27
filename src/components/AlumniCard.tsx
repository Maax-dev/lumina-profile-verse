
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronUp, MapPin, Briefcase } from "lucide-react";

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
  const graduationYear = education[0]?.end_date || "N/A";

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="w-[280px] hover:scale-[1.02] transition-all duration-200 cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile.profile_picture_url} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{profile.name}</h3>
                <p className="text-xs text-muted-foreground">Class of {graduationYear}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile.profile_picture_url} alt={profile.name} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{profile.name}</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {profile.location}
              </p>
              <p className="text-sm mt-1">{profile.headline}</p>
            </div>
          </div>
          
          {experience[0] && (
            <div className="flex items-center gap-3 pt-2 border-t">
              <Avatar className="h-8 w-8">
                <AvatarImage src={experience[0].company_logo} alt={experience[0].company_name} />
                <AvatarFallback><Briefcase className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{experience[0].title}</p>
                <p className="text-muted-foreground">{experience[0].company_name}</p>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground pt-2 border-t">
            {education[0]?.degree} in {education[0]?.field_of_study}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
