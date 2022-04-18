const configBase = {
  type: 'postgres',
  host: process.env.DB_POSTGRES_HOST || '127.0.0.1',
  port: process.env.DB_POSTGRES_PORT || '5432',
  database: process.env.DB_POSTGRES_DATABASE || 'postgres',
  username: process.env.DB_POSTGRES_USERNAME || 'postgres',
  password: process.env.DB_POSTGRES_PASSWORD || '12345',
  entities: ['dist/src/modules/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  migrationsRun: true,
  synchronize: false,
  dropSchema: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

module.exports = configBase;
