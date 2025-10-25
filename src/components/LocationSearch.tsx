import { useState } from "react";
import { MapPin, Search, Navigation } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
  onUseCurrentLocation: () => void;
  currentLocation?: string;
  isUsingCurrentLocation: boolean;
}

export const LocationSearch = ({ onLocationSelect, onUseCurrentLocation, currentLocation, isUsingCurrentLocation }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke('geocoding', {
        body: { location: searchQuery }
      });

      if (error) throw error;

      if (data && data.length > 0) {
        const location = data[0];
        onLocationSelect(location.lat, location.lon, location.name);
        setSearchQuery("");
        toast({
          title: "Location updated",
          description: `Now showing weather for ${location.name}`,
        });
      } else {
        toast({
          title: "Location not found",
          description: "Please try a different search term",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching location:", error);
      toast({
        title: "Search failed",
        description: "Unable to search for location",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-4 mb-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-primary" />
        <span className="text-sm text-muted-foreground">
          {currentLocation || "Search for a location"}
        </span>
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter city name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSearching}
          className="flex-1"
        />
        <Button
          onClick={handleSearch}
          disabled={isSearching || !searchQuery.trim()}
          size="icon"
        >
          <Search className="w-4 h-4" />
        </Button>
        <Button
          onClick={onUseCurrentLocation}
          disabled={isUsingCurrentLocation}
          size="icon"
          variant="outline"
          title="Use my current location"
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
