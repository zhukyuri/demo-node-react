import Redis from "ioredis";

const redis = new Redis({
  port: process.env.DB_REDIS_PORT,
  host: process.env.DB_REDIS_HOST,
  family: process.env.DB_REDIS_FAMILY,
  password: process.env.DB_REDIS_PASSWORD,
  db: process.env.DB_REDIS_DB,
});

export default redis
