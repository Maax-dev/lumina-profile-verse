
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });
  const { toast } = useToast();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    toast({
      title: `Theme Changed`,
      description: `Switched to ${newTheme} mode`,
      duration: 2000,
    });
  };

  const ThemeIcon = theme === "dark" ? Sun : Moon;
  // Use lighter gold in dark mode, darker blue in light mode
  const themeColor = theme === "dark" ? "text-ucla-darker-gold hover:text-ucla-gold" : "text-ucla-darkest-blue hover:text-ucla-blue";

  return (
    <Button
      variant="outline"
      size="icon"
      className={`w-10 h-10 rounded-full animate-fadeIn z-50 glass ${themeColor}`}
      onClick={toggleTheme}
    >
      <ThemeIcon className="h-5 w-5" />
    </Button>
  );
}
