import { MapPin, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LocationPermissionProps {
  onRequestLocation: () => void;
  error: string | null;
  permissionStatus: PermissionState | null;
}

export const LocationPermission = ({
  onRequestLocation,
  error,
  permissionStatus,
}: LocationPermissionProps) => {
  if (permissionStatus === "granted") return null;

  return (
    <div className="glass-effect rounded-3xl p-8 animate-scale-in mb-8">
      <div className="flex items-start gap-4">
        <MapPin className="w-12 h-12 text-primary flex-shrink-0 animate-pulse-slow" />
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">Location Access Required</h3>
          <p className="text-muted-foreground mb-4">
            To show accurate weather and air quality data for your area, we need access to your device's location.
          </p>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={onRequestLocation}
            size="lg"
            className="gap-2 transition-bounce"
          >
            <MapPin className="w-5 h-5" />
            Enable Location Access
          </Button>
        </div>
      </div>
    </div>
  );
};
