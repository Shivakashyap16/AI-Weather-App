import { useEffect, useState } from "react";
import stormBg from "@/assets/weather-storm.jpg";
import clearBg from "@/assets/weather-clear.jpg";
import rainBg from "@/assets/weather-rain.jpg";
import sunsetBg from "@/assets/weather-sunset.jpg";

interface WeatherCanvasProps {
  condition: "storm" | "clear" | "rain" | "sunset";
  mood: "day" | "night" | "chill";
}

const backgrounds = {
  storm: stormBg,
  clear: clearBg,
  rain: rainBg,
  sunset: sunsetBg,
};

export const WeatherCanvas = ({ condition, mood }: WeatherCanvasProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [condition, mood]);

  const getMoodOverlay = () => {
    switch (mood) {
      case "night":
        return "bg-blue-950/40";
      case "chill":
        return "bg-purple-950/30";
      default:
        return "";
    }
  };

  const getCloudAnimation = () => {
    switch (condition) {
      case "storm":
        return { 
          speed: "animate-drift-storm", 
          opacity: "opacity-90", 
          count: 8, 
          blur: "blur-2xl", 
          color: "rgba(60,60,80,0.9)",
          glow: "rgba(80,80,100,0.4)"
        };
      case "rain":
        return { 
          speed: "animate-drift-fast", 
          opacity: "opacity-70", 
          count: 6, 
          blur: "blur-3xl", 
          color: "rgba(120,120,140,0.7)",
          glow: "rgba(140,140,160,0.3)"
        };
      case "clear":
        return { 
          speed: "animate-drift-slow", 
          opacity: "opacity-40", 
          count: 4, 
          blur: "blur-3xl", 
          color: "rgba(255,255,255,0.5)",
          glow: "rgba(255,255,255,0.2)"
        };
      case "sunset":
        return { 
          speed: "animate-drift-medium", 
          opacity: "opacity-60", 
          count: 5, 
          blur: "blur-2xl", 
          color: "rgba(255,200,150,0.7)",
          glow: "rgba(255,180,120,0.3)"
        };
      default:
        return { 
          speed: "animate-drift-medium", 
          opacity: "opacity-50", 
          count: 5, 
          blur: "blur-2xl", 
          color: "rgba(200,200,220,0.6)",
          glow: "rgba(180,180,200,0.3)"
        };
    }
  };

  const cloudConfig = getCloudAnimation();

  // Generate cinematic cloud layers with depth
  const generateCloudLayer = (layerIndex: number, totalLayers: number) => {
    const layerCount = Math.ceil(cloudConfig.count / totalLayers);
    const clouds = [];
    
    for (let i = 0; i < layerCount; i++) {
      // Vary size based on layer depth
      const baseSize = 250 + (layerIndex * 80);
      const size = baseSize + Math.random() * 150;
      const topPosition = 5 + (i * 25) + Math.random() * 15;
      const delay = (layerIndex * layerCount + i) * 4;
      const verticalFloat = Math.sin(i) * 8;
      const layerOpacity = 0.3 + (layerIndex * 0.25);
      
      clouds.push(
        <div
          key={`${layerIndex}-${i}`}
          className={`absolute ${cloudConfig.speed}`}
          style={{
            top: `${topPosition + verticalFloat}%`,
            left: `-25%`,
            width: `${size}px`,
            height: `${size * 0.35}px`,
            opacity: layerOpacity,
            background: `radial-gradient(ellipse at center, ${cloudConfig.color} 0%, ${cloudConfig.glow} 40%, transparent 70%)`,
            borderRadius: "50%",
            filter: `${cloudConfig.blur} drop-shadow(0 0 60px ${cloudConfig.glow})`,
            animationDelay: `${delay}s`,
            transform: `scale(${0.7 + layerIndex * 0.4})`,
            zIndex: layerIndex,
            mixBlendMode: 'screen',
          }}
        />
      );
    }
    return clouds;
  };

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        style={{ backgroundImage: `url(${backgrounds[condition]})` }}
      />
      
      {/* Cinematic Multi-layer Clouds with Depth */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Background layer - slowest, most blurred, smallest */}
        <div className="absolute inset-0">
          {generateCloudLayer(0, 3)}
        </div>
        
        {/* Mid layer - medium speed and size */}
        <div className="absolute inset-0">
          {generateCloudLayer(1, 3)}
        </div>
        
        {/* Foreground layer - fastest, largest, sharpest */}
        <div className="absolute inset-0">
          {generateCloudLayer(2, 3)}
        </div>
      </div>
      
      {/* Atmospheric haze for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-background/5 backdrop-blur-[0.5px]" />

      <div className={`absolute inset-0 ${getMoodOverlay()} transition-colors duration-1000`} />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
    </div>
  );
};
