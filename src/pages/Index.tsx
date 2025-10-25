import { useState } from "react";
import { WeatherCanvas } from "@/components/WeatherCanvas";
import { CurrentWeather } from "@/components/CurrentWeather";
import { AIInsights } from "@/components/AIInsights";
import { AirQuality } from "@/components/AirQuality";
import { WindCard } from "@/components/WindCard";
import { SunriseSunsetCard } from "@/components/SunriseSunsetCard";
import { HourlyForecast } from "@/components/HourlyForecast";
import { LocationPermission } from "@/components/LocationPermission";
import { LocationSearch } from "@/components/LocationSearch";
import { MoonPhaseCard } from "@/components/MoonPhaseCard";
import { PrecipitationCard } from "@/components/PrecipitationCard";
import { WeeklyForecast } from "@/components/WeeklyForecast";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useWeatherGreeting } from "@/hooks/useWeatherGreeting";
import { useGeolocation } from "@/hooks/useGeolocation";
import { generateWeatherInsights } from "@/utils/weatherInsights";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { latitude: geoLatitude, longitude: geoLongitude, error: locationError, loading: locationLoading, permissionStatus, requestLocation } = useGeolocation();
  
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);

  const latitude = selectedLocation?.lat ?? geoLatitude;
  const longitude = selectedLocation?.lon ?? geoLongitude;
  
  const { data: weatherData, isLoading: weatherLoading } = useWeatherData(latitude, longitude);
  
  const greetingParams = weatherData?.weather ? {
    temperature: weatherData.weather.temperature,
    condition: weatherData.weather.condition,
    location: selectedLocation?.name || weatherData.weather.location
  } : null;
  
  const { data: greeting, isLoading: greetingLoading } = useWeatherGreeting(greetingParams);

  const handleLocationSelect = (lat: number, lon: number, name: string) => {
    setSelectedLocation({ lat, lon, name });
  };

  const handleUseCurrentLocation = () => {
    setSelectedLocation(null);
  };

  const getWeatherCondition = () => {
    if (!weatherData?.weather) return "clear";
    const condition = weatherData.weather.condition.toLowerCase();
    if (condition.includes("rain")) return "rain";
    if (condition.includes("storm") || condition.includes("thunder")) return "storm";
    if (condition.includes("cloud")) return "sunset";
    return "clear";
  };

  const insights = weatherData?.weather ? generateWeatherInsights(weatherData.weather) : [];

  const isLoading = locationLoading || (weatherLoading && latitude !== null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            {locationLoading ? "Getting your location..." : "Loading weather data..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <WeatherCanvas condition={getWeatherCondition()} mood="day" />
      
      <div className="min-h-screen relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <header className="mb-12 animate-fade-in">
            {greetingLoading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary/60" />
                <p className="text-2xl text-foreground/60">Crafting your weather greeting...</p>
              </div>
            ) : greeting ? (
              <h1 className="text-4xl md:text-5xl font-semibold text-foreground/80">
                {greeting}
              </h1>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-semibold text-foreground/80">
                  Weather Experience
                </h1>
                <p className="text-sm text-foreground/60">
                  Cinematic forecasts with AI-powered insights
                </p>
              </>
            )}
          </header>

          {/* Location Search */}
          <LocationSearch 
            onLocationSelect={handleLocationSelect}
            onUseCurrentLocation={handleUseCurrentLocation}
            currentLocation={selectedLocation?.name || weatherData?.weather.location}
            isUsingCurrentLocation={!selectedLocation}
          />

          {/* Location Permission Request */}
          {permissionStatus !== "granted" && (
            <LocationPermission
              onRequestLocation={requestLocation}
              error={locationError}
              permissionStatus={permissionStatus}
            />
          )}

          {/* Main Content Grid */}
          {weatherData && (
            <>
              {/* Top Row - 3 Column Layout */}
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {/* Left Column - Current Weather */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  <CurrentWeather
                    temperature={weatherData.weather.temperature}
                    condition={weatherData.weather.condition}
                    location={weatherData.weather.location}
                    feelsLike={weatherData.weather.feelsLike}
                    humidity={weatherData.weather.humidity}
                    windSpeed={weatherData.weather.windSpeed}
                  />
                  <div className="grid grid-cols-2 gap-6">
                    <MoonPhaseCard phase={weatherData.moonPhase} />
                    <PrecipitationCard 
                      rain={weatherData.weather.precipitation.rain}
                      snow={weatherData.weather.precipitation.snow}
                    />
                  </div>
                </div>

                {/* Middle Column - Hourly Forecast */}
                <div className="lg:col-span-1">
                  <HourlyForecast 
                    forecast={weatherData.hourlyForecast}
                    timezoneOffset={weatherData.timezoneOffset}
                  />
                </div>

                {/* Right Column - Insights & Air Quality */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {insights.length > 0 && <AIInsights insights={insights} />}
                  
                  <AirQuality 
                    aqi={weatherData.aqi.index}
                    components={weatherData.aqi.components}
                  />
                </div>
              </div>
              
              {/* Middle Row - Weekly Forecast */}
              <div className="mb-6">
                <WeeklyForecast forecast={weatherData.dailyForecast} />
              </div>
              
              {/* Bottom Row - Wind & Sunrise/Sunset */}
              <div className="grid md:grid-cols-2 gap-6">
                <WindCard 
                  speed={weatherData.weather.windSpeed}
                  direction={weatherData.weather.windDirection}
                />
                <SunriseSunsetCard 
                  sunrise={weatherData.weather.sunrise}
                  sunset={weatherData.weather.sunset}
                  timezoneOffset={weatherData.timezoneOffset}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
