import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AIInsightsProps {
  insights: string[];
}

export const AIInsights = ({ insights }: AIInsightsProps) => {
  return (
    <Card className="glass-effect border-0 p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-accent animate-pulse-slow" />
        <h3 className="text-xl font-bold">AI Weather Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 transition-smooth hover:bg-secondary/70"
          >
            <div className="w-2 h-2 rounded-full bg-accent mt-2 animate-pulse-slow" />
            <p className="text-foreground/90 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
