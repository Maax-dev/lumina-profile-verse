
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";

interface ProfileCardProps {
  profile: {
    name: string;
    location: string;
    headline: string;
    profile_picture_url: string;
  };
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="w-full hover:scale-[1.02] transition-all duration-200 animate-fadeIn glass">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16 border border-primary/30">
          <AvatarImage src={profile.profile_picture_url} alt={profile.name} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="h-3 w-3 mr-1 inline" />
            {profile.location}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{profile.headline}</p>
      </CardContent>
    </Card>
  );
}
