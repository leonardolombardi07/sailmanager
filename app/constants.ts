export const APP_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://sail-manager.vercel.app"
    : "http://localhost:3000";

export const APP_NAME = "Sail Manager";
