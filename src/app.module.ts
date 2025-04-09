import { Logger, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoviesModule } from './movies/movies.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GenresModule } from './genres/genres.module'
import { CastsModule } from './casts/casts.module'
import { CountriesModule } from './countries/countries.module'
import { ProductionsModule } from './productions/productions.module'
import { AppDataSource } from './config/data-source'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
import { ConfigModule, ConfigService } from '@nestjs/config'
import config from './config/config'
import KeyvRedis, { Keyv } from '@keyv/redis'
import { SearchModule } from './search/search.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: true,
      useFactory: async (config: ConfigService) => ({
        ttl: 60_000, // 60 * 1000 milliseconds
        stores: [new Keyv(new KeyvRedis(config.get<string>('redis.url')))],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    MoviesModule,
    GenresModule,
    CastsModule,
    CountriesModule,
    ProductionsModule,
    AuthModule,
    UsersModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
