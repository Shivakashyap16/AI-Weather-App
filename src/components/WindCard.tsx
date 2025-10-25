import { Wind } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WindCardProps {
  speed: number;
  direction: number;
}

const getWindDirection = (deg: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

export const WindCard = ({ speed, direction }: WindCardProps) => {
  return (
    <Card className="glass-effect border-0 p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Wind className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold">Wind</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">{Math.round(speed)}</p>
          <p className="text-sm text-muted-foreground">km/h</p>
          <p className="text-sm font-medium mt-2">{getWindDirection(direction)}</p>
        </div>
        
        {/* Compass */}
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Compass circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border"
            />
            
            {/* Cardinal directions */}
            <text x="50" y="15" textAnchor="middle" className="text-xs fill-foreground font-semibold">N</text>
            <text x="85" y="53" textAnchor="middle" className="text-xs fill-muted-foreground">E</text>
            <text x="50" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">S</text>
            <text x="15" y="53" textAnchor="middle" className="text-xs fill-muted-foreground">W</text>
            
            {/* Wind direction arrow */}
            <g transform={`rotate(${direction} 50 50)`}>
              <path
                d="M 50 25 L 55 45 L 50 40 L 45 45 Z"
                className="fill-accent"
              />
              <line
                x1="50"
                y1="45"
                x2="50"
                y2="70"
                stroke="currentColor"
                strokeWidth="2"
                className="text-accent"
              />
            </g>
          </svg>
        </div>
      </div>
    </Card>
  );
};
