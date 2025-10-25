import { Cloud, CloudRain, CloudSnow, Sun, Wind } from "lucide-react";

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  location: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
}

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Default: Cloud,
};

export const CurrentWeather = ({
  temperature,
  condition,
  location,
  feelsLike,
  humidity,
  windSpeed,
}: CurrentWeatherProps) => {
  const IconComponent = weatherIcons[condition as keyof typeof weatherIcons] || weatherIcons.Default;

  return (
    <div className="glass-effect rounded-3xl p-8 animate-scale-in">
      <div className="mb-6">
        <h2 className="text-muted-foreground text-lg mb-2">{location}</h2>
        <div className="flex items-center gap-6">
          <IconComponent className="w-20 h-20 text-primary animate-float" />
          <div>
            <div className="text-7xl font-bold text-glow">{Math.round(temperature)}°</div>
            <p className="text-2xl text-muted-foreground mt-2">{condition}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Feels Like</p>
          <p className="text-xl font-semibold">{Math.round(feelsLike)}°</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Humidity</p>
          <p className="text-xl font-semibold">{humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Wind</p>
          <p className="text-xl font-semibold flex items-center justify-center gap-1">
            <Wind className="w-4 h-4" />
            {Math.round(windSpeed)}
          </p>
        </div>
      </div>
    </div>
  );
};
