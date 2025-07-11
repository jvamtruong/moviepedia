import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter'
import { Logger, ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:5173', // or array of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  })
  app.setGlobalPrefix('api/v1')
  const loggerInstance = app.get(Logger)
  app.useGlobalFilters(new AllExceptionsFilter(loggerInstance))
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 5000)
}

bootstrap()
