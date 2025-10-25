interface WeatherCondition {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export const generateWeatherInsights = (weather: WeatherCondition): string[] => {
  const insights: string[] = [];

  // Temperature-based insights
  if (weather.temperature > 25) {
    insights.push("Perfect weather for outdoor activities! Stay hydrated and wear sunscreen.");
  } else if (weather.temperature > 15) {
    insights.push("Ideal temperature for a refreshing walk or bike ride.");
  } else if (weather.temperature < 10) {
    insights.push("Bundle up! It's quite chilly outside. Perfect for cozy indoor activities.");
  }

  // Condition-based insights
  if (weather.condition === "Clear") {
    insights.push("Crystal clear skies ahead - great for stargazing tonight!");
  } else if (weather.condition === "Rain") {
    insights.push("Rainy weather detected. Bring an umbrella and enjoy the peaceful atmosphere.");
  } else if (weather.condition === "Clouds") {
    insights.push("Cloudy conditions create perfect soft lighting for photography.");
  }

  // Humidity-based insights
  if (weather.humidity > 70) {
    insights.push("High humidity levels - you might feel warmer than the actual temperature.");
  } else if (weather.humidity < 30) {
    insights.push("Low humidity detected. Keep your skin moisturized and drink plenty of water.");
  }

  // Wind-based insights
  if (weather.windSpeed > 20) {
    insights.push("Windy conditions! Secure loose items and be cautious outdoors.");
  }

  // Activity suggestions
  if (weather.temperature > 20 && weather.condition === "Clear") {
    insights.push("Excellent conditions for hiking, picnics, or outdoor sports!");
  }

  return insights.slice(0, 3); // Return top 3 insights
};
