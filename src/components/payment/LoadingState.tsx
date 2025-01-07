import { Loader2 } from "lucide-react";

export const LoadingState = () => (
  <div className="flex items-center justify-center py-8">
    <Loader2 className="h-8 w-8 animate-spin text-swedish-blue" />
    <span className="ml-2 text-sm text-muted-foreground">
      Initializing payment...
    </span>
  </div>
);