import { Sunrise, Sunset } from "lucide-react";
import { Card } from "@/components/ui/card";
import { fromUnixTime, format } from "date-fns";

interface SunriseSunsetCardProps {
  sunrise: number;
  sunset: number;
  timezoneOffset: number;
}

const formatTime = (timestamp: number, timezoneOffset: number): string => {
  const date = fromUnixTime(timestamp);
  const offsetMs = timezoneOffset * 1000;
  const localDate = new Date(date.getTime() + offsetMs);
  return format(localDate, "h:mm a");
};

const isDaytime = (sunrise: number, sunset: number): boolean => {
  const now = Date.now() / 1000;
  return now >= sunrise && now <= sunset;
};

export const SunriseSunsetCard = ({ sunrise, sunset, timezoneOffset }: SunriseSunsetCardProps) => {
  const daytime = isDaytime(sunrise, sunset);
  
  return (
    <Card className="glass-effect border-0 p-6 animate-fade-in">
      <div className="space-y-4">
        {/* Sunrise */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${!daytime ? 'bg-accent/20' : 'bg-accent/10'}`}>
              <Sunrise className={`w-5 h-5 ${!daytime ? 'text-accent animate-pulse-slow' : 'text-accent/50'}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sunrise</p>
              <p className="text-xl font-semibold">{formatTime(sunrise, timezoneOffset)}</p>
            </div>
          </div>
        </div>
        
        {/* Visual Timeline */}
        <div className="relative h-12 flex items-center">
          <div className="w-full h-1 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20 rounded-full" />
          
          {/* Sun position indicator */}
          <div 
            className="absolute w-8 h-8 rounded-full bg-accent shadow-lg shadow-accent/50 flex items-center justify-center transition-all"
            style={{
              left: daytime 
                ? `${((Date.now() / 1000 - sunrise) / (sunset - sunrise)) * 100}%`
                : '0%',
              transform: 'translateX(-50%)'
            }}
          >
            {daytime ? (
              <Sunrise className="w-4 h-4 text-background" />
            ) : (
              <Sunset className="w-4 h-4 text-background" />
            )}
          </div>
        </div>
        
        {/* Sunset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${daytime ? 'bg-primary/20' : 'bg-primary/10'}`}>
              <Sunset className={`w-5 h-5 ${daytime ? 'text-primary animate-pulse-slow' : 'text-primary/50'}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sunset</p>
              <p className="text-xl font-semibold">{formatTime(sunset, timezoneOffset)}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
