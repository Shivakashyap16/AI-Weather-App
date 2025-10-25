import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface WeatherGreetingParams {
  temperature: number;
  condition: string;
  location: string;
}

const fetchWeatherGreeting = async (params: WeatherGreetingParams): Promise<string> => {
  const { data, error } = await supabase.functions.invoke('weather-greeting', {
    body: params
  });

  if (error) throw error;
  
  return data.greeting;
};

export const useWeatherGreeting = (params: WeatherGreetingParams | null) => {
  return useQuery({
    queryKey: ["weather-greeting", params?.temperature, params?.condition, params?.location],
    queryFn: () => fetchWeatherGreeting(params!),
    enabled: params !== null,
    staleTime: 300000, // Consider greeting fresh for 5 minutes
  });
};
