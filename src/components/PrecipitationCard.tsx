import { Card } from "@/components/ui/card";
import { CloudRain, Snowflake } from "lucide-react";

interface PrecipitationCardProps {
  rain: number;
  snow: number;
}

export const PrecipitationCard = ({ rain, snow }: PrecipitationCardProps) => {
  const total = rain + snow;
  const rainPercentage = total > 0 ? (rain / total) * 100 : 0;
  const snowPercentage = total > 0 ? (snow / total) * 100 : 0;

  return (
    <Card className="glass-effect border-0 p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <CloudRain className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Precipitation</h3>
      </div>
      
      <div className="space-y-4">
        {total === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl font-bold text-foreground/40 mb-2">0 mm</p>
            <p className="text-sm text-muted-foreground">No precipitation in the last hour</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {total.toFixed(1)} mm
              </p>
              <p className="text-sm text-muted-foreground mt-1">Last hour</p>
            </div>

            <div className="space-y-3">
              {rain > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium">Rain</span>
                    </div>
                    <span className="text-sm font-bold">{rain.toFixed(1)} mm</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${rainPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {snow > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Snowflake className="w-4 h-4 text-cyan-300" />
                      <span className="text-sm font-medium">Snow</span>
                    </div>
                    <span className="text-sm font-bold">{snow.toFixed(1)} mm</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-300 rounded-full transition-all duration-500"
                      style={{ width: `${snowPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
