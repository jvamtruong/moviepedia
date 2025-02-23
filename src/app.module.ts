import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoviesModule } from './movies/movies.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module'
import { GenresModule } from './genres/genres.module'
import { CastsModule } from './casts/casts.module';
import { CountriesModule } from './countries/countries.module';
import { ProductionsModule } from './productions/productions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'clone',
      entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsRun: false,
    }),
    MoviesModule,
    ElasticsearchModule,
    GenresModule,
    CastsModule,
    CountriesModule,
    ProductionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
