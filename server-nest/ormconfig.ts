const configBase = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: process.env.POSTGRES_PORT || '5432',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '12345',
  entities: ['dist/**/*.entity.js'],
  migrations: ['srs/migrations/*.ts'],
  migrationsRun: true,
  synchronize: true,
  dropSchema: true,
};

module.exports = configBase;
