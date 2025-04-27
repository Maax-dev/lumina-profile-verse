
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBox } from "@/components/SearchBox";
import { ProfileCard } from "@/components/ProfileCard";

const mockProfiles = [
  {
    name: "John Doe",
    location: "Los Angeles, CA",
    headline: "Software Engineer at Tech Corp",
    profile_picture_url: "https://i.pravatar.cc/150?u=1",
  },
  {
    name: "Jane Smith",
    location: "Los Angeles, CA",
    headline: "Full Stack Developer at StartupCo",
    profile_picture_url: "https://i.pravatar.cc/150?u=2",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Alumni Search Platform
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Find and connect with software alumni from top universities
          </p>
          <SearchBox />
        </div>
      </section>

      {/* Results Section */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockProfiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
