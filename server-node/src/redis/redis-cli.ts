import Redis from 'ioredis';

// @ts-ignore
const redis = new Redis({
  host: process.env.DB_REDIS_HOST,
  port: process.env.DB_REDIS_PORT,
  db: process.env.DB_REDIS_DB,
  family: process.env.DB_REDIS_FAMILY,
  password: process.env.DB_REDIS_PASSWORD,
});

export default redis;
