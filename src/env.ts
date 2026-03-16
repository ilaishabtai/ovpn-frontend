const getEnv = (key: string, defaultValue: string): string => {
  const raw = import.meta.env[key];
  if (raw === undefined || raw === "") {
    return defaultValue;
  }
  return raw;
};

export const env = {
  BACKEND_URL: getEnv("VITE_BACKEND_API_URL", "http://localhost:8000"),
  BACKEND_TIMEOUT: Number(getEnv("VITE_BACKEND_TIMEOUT", "5000")),
  POLL_INTERVAL: Number(getEnv("VITE_BACKEND_POLL_INTERVAL", "3000")),
} as const;
