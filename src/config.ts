const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  maxRequests: process.env.MAX_REQUESTS
    ? parseInt(process.env.MAX_REQUESTS)
    : 100,
  maxRequestsWindow: process.env.MAX_REQUESTS_WINDOW || "1 minute",
  host: process.env.HOST || "0.0.0.0",
};

export default config;
