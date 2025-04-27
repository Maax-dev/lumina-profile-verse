
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  progress?: number;
}

export function LoadingState({ message = "Loading results...", progress = 50 }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 max-w-lg mx-auto">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-ucla-blue/20 dark:border-ucla-lighter-blue/20"></div>
        <Loader2 className="w-16 h-16 text-ucla-blue dark:text-ucla-lighter-blue absolute top-0 left-0 animate-spin" />
      </div>
      
      <p className="mt-6 text-center text-lg font-medium">{message}</p>
      <p className="mt-2 text-sm text-muted-foreground text-center">Please wait while we retrieve your data</p>
      
      <Progress value={progress} className="mt-6 h-2 w-full" />
    </div>
  );
}
