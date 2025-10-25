import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, CloudSnow, Sun } from "lucide-react";
import { fromUnixTime, format } from "date-fns";

interface HourlyForecastProps {
  forecast: Array<{
    time: number;
    temperature: number;
    condition: string;
    icon: string;
  }>;
  timezoneOffset: number;
}

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Default: Cloud,
};

const getWeatherIcon = (condition: string) => {
  const IconComponent = weatherIcons[condition as keyof typeof weatherIcons] || weatherIcons.Default;
  return IconComponent;
};

const formatTime = (timestamp: number, timezoneOffset: number): string => {
  const date = fromUnixTime(timestamp);
  const offsetMs = timezoneOffset * 1000;
  const localDate = new Date(date.getTime() + offsetMs);
  return format(localDate, "h a");
};

export const HourlyForecast = ({ forecast, timezoneOffset }: HourlyForecastProps) => {
  return (
    <Card className="glass-effect border-0 p-6 animate-fade-in h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>
      
      <div className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {forecast.map((hour, index) => {
          const IconComponent = getWeatherIcon(hour.condition);
          const isNow = index === 0;
          
          return (
            <div
              key={hour.time}
              className={`flex items-center justify-between p-2.5 rounded-lg transition-all ${
                isNow 
                  ? 'bg-accent/20 border border-accent/30' 
                  : 'bg-secondary/30 hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className={`text-xs font-medium min-w-[50px] ${isNow ? 'text-accent' : 'text-foreground/70'}`}>
                  {isNow ? 'Now' : formatTime(hour.time, timezoneOffset)}
                </span>
                
                <div className={`p-1.5 rounded-lg ${isNow ? 'bg-accent/30' : 'bg-primary/10'}`}>
                  <IconComponent className={`w-4 h-4 ${isNow ? 'text-accent' : 'text-primary'}`} />
                </div>
                
                <span className="text-xs text-muted-foreground capitalize flex-1 truncate">
                  {hour.condition}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${isNow ? 'text-accent' : 'text-foreground'}`}>
                  {Math.round(hour.temperature)}°
                </span>
                
                {/* Temperature bar visualization */}
                <div className="w-16 h-1.5 bg-secondary/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isNow ? 'bg-accent' : 'bg-primary'}`}
                    style={{ 
                      width: `${Math.min(100, Math.max(0, (hour.temperature + 10) / 50 * 100))}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
