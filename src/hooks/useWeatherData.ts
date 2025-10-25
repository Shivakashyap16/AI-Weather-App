import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  condition: string;
  description: string;
  location: string;
  sunrise: number;
  sunset: number;
  precipitation: {
    rain: number;
    snow: number;
  };
}

interface HourlyForecast {
  time: number;
  temperature: number;
  condition: string;
  icon: string;
}

interface DailyForecast {
  date: number;
  tempMax: number;
  tempMin: number;
  condition: string;
  icon: string;
  description: string;
}

interface AQIData {
  index: number;
  components: {
    co: number;
    no2: number;
    o3: number;
    pm2_5: number;
    pm10: number;
  };
}

interface WeatherResponse {
  weather: WeatherData;
  aqi: AQIData;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  moonPhase: number;
  timezone: string;
  timezoneOffset: number;
}

const fetchWeatherData = async (
  latitude: number | null,
  longitude: number | null
): Promise<WeatherResponse | null> => {
  if (!latitude || !longitude) {
    return null;
  }

  try {
    const { data, error } = await supabase.functions.invoke('weather-data', {
      body: { lat: latitude, lon: longitude }
    });

    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const useWeatherData = (latitude: number | null, longitude: number | null) => {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => fetchWeatherData(latitude, longitude),
    enabled: latitude !== null && longitude !== null,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};
