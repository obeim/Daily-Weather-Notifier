const env = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  maxRequests: process.env.MAX_REQUESTS
    ? parseInt(process.env.MAX_REQUESTS)
    : 10,
  maxRequestsWindow: process.env.MAX_REQUESTS_WINDOW || "1 minute",
  host: process.env.HOST || "0.0.0.0",
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    password: process.env.REDIS_PASSWORD,
  },
  nodemailer: {
    service: process.env.NODEMAILER_EMAIL_SERVICE,
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
};

export default env;
