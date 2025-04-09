export default () => ({
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/entities/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: ['dist/migrations/*.{ts,js}'],
    migrationsTableName: 'migrations',
    logging: true,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
    url: process.env.REDIS_URL,
  },
  elasticsearch: {
    node: process.env.ELASTICSEARCH_NODE,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
  },
})
