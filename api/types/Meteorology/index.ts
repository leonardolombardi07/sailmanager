export type MeteorologySummary = {
  condition: "sunny" | "rainy" | "cloudy"; // etc

  temperature: number; // celsius
  feelsLikeTemperature: number; // celsius

  wind: {
    speed: number; // knots
    direction: number; // degrees
    gust: number; // knots
    shift: number; // degrees
  };

  current: {
    speed: number; // knots
    direction: number; // degrees
  };

  waves: {
    height: number; // meters
    period: number; // seconds
  };
};
