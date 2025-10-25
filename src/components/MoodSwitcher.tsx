import { Moon, Sun, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MoodSwitcherProps {
  currentMood: "day" | "night" | "chill";
  onMoodChange: (mood: "day" | "night" | "chill") => void;
}

export const MoodSwitcher = ({ currentMood, onMoodChange }: MoodSwitcherProps) => {
  const moods = [
    { id: "day" as const, icon: Sun, label: "Day" },
    { id: "night" as const, icon: Moon, label: "Night" },
    { id: "chill" as const, icon: Sparkles, label: "Chill" },
  ];

  return (
    <div className="glass-effect rounded-2xl p-2 flex gap-2 animate-scale-in">
      {moods.map(({ id, icon: Icon, label }) => (
        <Button
          key={id}
          variant={currentMood === id ? "default" : "ghost"}
          onClick={() => onMoodChange(id)}
          className={`flex-1 gap-2 transition-bounce ${
            currentMood === id
              ? "bg-primary text-primary-foreground shadow-lg scale-105"
              : "hover:bg-secondary"
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};
