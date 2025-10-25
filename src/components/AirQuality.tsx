import { Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AirQualityProps {
  aqi: number;
  components: {
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
  };
}

const getAQIStatus = (aqi: number) => {
  switch (aqi) {
    case 1:
      return { label: "Good", color: "text-green-500", bgColor: "bg-green-500/20" };
    case 2:
      return { label: "Fair", color: "text-yellow-500", bgColor: "bg-yellow-500/20" };
    case 3:
      return { label: "Moderate", color: "text-orange-500", bgColor: "bg-orange-500/20" };
    case 4:
      return { label: "Poor", color: "text-red-500", bgColor: "bg-red-500/20" };
    case 5:
      return { label: "Very Poor", color: "text-purple-500", bgColor: "bg-purple-500/20" };
    default:
      return { label: "Unknown", color: "text-muted-foreground", bgColor: "bg-muted" };
  }
};

export const AirQuality = ({ aqi, components }: AirQualityProps) => {
  const status = getAQIStatus(aqi);

  return (
    <Card className="glass-effect border-0 p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Wind className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">Air Quality Index</h3>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-2">
          <div className={`text-5xl font-bold ${status.color}`}>{aqi}</div>
          <div className={`text-xl font-semibold ${status.color}`}>{status.label}</div>
        </div>
        <div className={`inline-block px-4 py-2 rounded-full ${status.bgColor} ${status.color} text-sm font-medium`}>
          AQI Level {aqi}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3">Air Components (μg/m³)</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">PM2.5</p>
            <p className="text-lg font-semibold">{components.pm2_5.toFixed(1)}</p>
          </div>
          
          <div className="p-3 rounded-xl bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">PM10</p>
            <p className="text-lg font-semibold">{components.pm10.toFixed(1)}</p>
          </div>
          
          <div className="p-3 rounded-xl bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">O₃</p>
            <p className="text-lg font-semibold">{components.o3.toFixed(1)}</p>
          </div>
          
          <div className="p-3 rounded-xl bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">NO₂</p>
            <p className="text-lg font-semibold">{components.no2.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
