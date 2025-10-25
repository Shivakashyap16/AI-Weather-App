import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lon } = await req.json();
    
    if (!lat || !lon) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('OPENWEATHER_API_KEY');
    if (!apiKey) {
      throw new Error('OPENWEATHER_API_KEY not configured');
    }

    // Fetch weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await weatherResponse.json();

    // Fetch air quality data
    const aqiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    if (!aqiResponse.ok) {
      throw new Error('Failed to fetch air quality data');
    }

    const aqiData = await aqiResponse.json();

    // Fetch hourly forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    if (!forecastResponse.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const forecastData = await forecastResponse.json();
    
    // Get next 24 hours (8 x 3-hour intervals)
    const hourlyForecast = forecastData.list.slice(0, 8).map((item: any) => ({
      time: item.dt,
      temperature: item.main.temp,
      condition: item.weather[0].main,
      icon: item.weather[0].icon,
    }));

    // Extract daily forecast (one per day at noon)
    const dailyForecast = forecastData.list
      .filter((item: any) => {
        const date = new Date(item.dt * 1000);
        return date.getHours() === 12; // Get forecast at noon
      })
      .slice(0, 7)
      .map((item: any) => ({
        date: item.dt,
        tempMax: item.main.temp_max,
        tempMin: item.main.temp_min,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }));

    // Calculate moon phase (0 = new moon, 0.5 = full moon, 1 = new moon)
    const calculateMoonPhase = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      
      let c = 0, e = 0, jd = 0, b = 0;
      
      if (month < 3) {
        const year2 = year - 1;
        const month2 = month + 12;
        c = Math.floor(year2 / 100);
        e = c / 4;
        jd = 365.25 * (year2 + 4716);
        b = Math.floor(30.6001 * (month2 + 1));
      } else {
        c = Math.floor(year / 100);
        e = 2 - c + Math.floor(c / 4);
        jd = 365.25 * (year + 4716);
        b = Math.floor(30.6001 * (month + 1));
      }
      
      jd = jd + b + day + e - 1524.5;
      const daysSinceNewMoon = jd - 2451549.5;
      const newMoons = daysSinceNewMoon / 29.53;
      const phase = (newMoons - Math.floor(newMoons));
      
      return phase;
    };

    const moonPhase = calculateMoonPhase(new Date());

    const responseData = {
      weather: {
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        windDirection: weatherData.wind.deg || 0,
        condition: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        location: weatherData.name,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
        precipitation: {
          rain: weatherData.rain?.['1h'] || 0,
          snow: weatherData.snow?.['1h'] || 0,
        },
      },
      aqi: {
        index: aqiData.list[0].main.aqi,
        components: aqiData.list[0].components,
      },
      hourlyForecast,
      dailyForecast,
      moonPhase,
      timezone: forecastData.city.timezone,
      timezoneOffset: forecastData.city.timezone,
    };

    return new Response(
      JSON.stringify(responseData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in weather-data function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
