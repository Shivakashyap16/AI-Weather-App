import { Card } from "@/components/ui/card";
import { Moon } from "lucide-react";

interface MoonPhaseCardProps {
  phase: number;
}

const getMoonPhaseInfo = (phase: number) => {
  if (phase < 0.03 || phase > 0.97) {
    return { name: "New Moon", emoji: "🌑", description: "The moon is not visible" };
  } else if (phase < 0.22) {
    return { name: "Waxing Crescent", emoji: "🌒", description: "The moon is growing" };
  } else if (phase < 0.28) {
    return { name: "First Quarter", emoji: "🌓", description: "Half of the moon is visible" };
  } else if (phase < 0.47) {
    return { name: "Waxing Gibbous", emoji: "🌔", description: "The moon is almost full" };
  } else if (phase < 0.53) {
    return { name: "Full Moon", emoji: "🌕", description: "The moon is fully visible" };
  } else if (phase < 0.72) {
    return { name: "Waning Gibbous", emoji: "🌖", description: "The moon is shrinking" };
  } else if (phase < 0.78) {
    return { name: "Last Quarter", emoji: "🌗", description: "Half of the moon is visible" };
  } else {
    return { name: "Waning Crescent", emoji: "🌘", description: "The moon is disappearing" };
  }
};

export const MoonPhaseCard = ({ phase }: MoonPhaseCardProps) => {
  const phaseInfo = getMoonPhaseInfo(phase);
  const illumination = Math.abs((phase < 0.5 ? phase : 1 - phase) * 2);

  return (
    <Card className="glass-effect border-0 p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Moon className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Moon Phase</h3>
      </div>
      
      <div className="flex flex-col items-center justify-center py-4">
        <div className="text-7xl mb-4 animate-pulse">
          {phaseInfo.emoji}
        </div>
        
        <h4 className="text-2xl font-bold mb-2">{phaseInfo.name}</h4>
        <p className="text-sm text-muted-foreground mb-4">{phaseInfo.description}</p>
        
        <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${illumination * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {Math.round(illumination * 100)}% Illuminated
        </p>
      </div>
    </Card>
  );
};
