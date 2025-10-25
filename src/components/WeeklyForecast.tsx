import { Card } from "@/components/ui/card";
import { Calendar, Cloud, CloudRain, CloudSnow, Sun } from "lucide-react";

interface DailyForecast {
  date: number;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  description: string;
}

interface WeeklyForecastProps {
  forecast: DailyForecast[];
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "rain":
    case "drizzle":
      return CloudRain;
    case "snow":
      return CloudSnow;
    case "clouds":
      return Cloud;
    default:
      return Sun;
  }
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }
  
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const WeeklyForecast = ({ forecast }: WeeklyForecastProps) => {
  return (
    <Card className="glass-effect border-0 p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">7-Day Forecast</h3>
      </div>
      
      <div className="space-y-3">
        {forecast.map((day) => {
          const IconComponent = getWeatherIcon(day.condition);
          const isToday = formatDate(day.date) === "Today";
          
          return (
            <div
              key={day.date}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                isToday 
                  ? 'bg-accent/20 border border-accent/30' 
                  : 'bg-secondary/30 hover:bg-secondary/50'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className={`text-sm font-medium min-w-[120px] ${isToday ? 'text-accent' : 'text-foreground/70'}`}>
                  {formatDate(day.date)}
                </span>
                
                <div className={`p-2 rounded-lg ${isToday ? 'bg-accent/30' : 'bg-primary/10'}`}>
                  <IconComponent className={`w-5 h-5 ${isToday ? 'text-accent' : 'text-primary'}`} />
                </div>
                
                <span className="text-sm text-muted-foreground capitalize flex-1">
                  {day.description}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {Math.round(day.tempMin)}°
                </span>
                <div className="w-20 h-1.5 bg-secondary/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${isToday ? 'bg-accent' : 'bg-primary'}`}
                    style={{ 
                      width: `${((day.tempMax - day.tempMin) / 20) * 100}%`,
                      marginLeft: `${((day.tempMin) / 40) * 100}%`
                    }}
                  />
                </div>
                <span className={`text-lg font-bold ${isToday ? 'text-accent' : 'text-foreground'}`}>
                  {Math.round(day.tempMax)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
