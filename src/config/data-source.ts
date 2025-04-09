import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config()

// 'src/entities/**/*.entity{.ts,.js}'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/entities/**/*.entity{.ts,.js}'],
  // entities: ['src/entities/**/*.entity.ts'],
  synchronize: false,
  migrations: ['dist/migrations/*.{ts,js}'],
  // migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
  logging: true,
})