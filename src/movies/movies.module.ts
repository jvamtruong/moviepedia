import { Module } from '@nestjs/common'
import { MoviesService } from './services/movies/movies.service'
import { MoviesController } from './controllers/movies/movies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Movie } from '../entities/movie.entity'
import { ElasticsearchModule } from 'src/elasticsearch/elasticsearch.module'
import { GenresModule } from 'src/genres/genres.module'
import { CastsModule } from 'src/casts/casts.module'
import { ProductionsModule } from 'src/productions/productions.module'
import { CountriesModule } from 'src/countries/countries.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    ElasticsearchModule,
    GenresModule,
    CastsModule,
    ProductionsModule,
    CountriesModule,
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
