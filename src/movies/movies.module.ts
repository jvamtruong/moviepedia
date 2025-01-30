import { Module } from '@nestjs/common'
import { MoviesService } from './services/movies/movies.service'
import { MoviesController } from './controllers/movies/movies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Movie } from '../entities/movie.entity'
import { MovieCountry } from '../entities/movie_country.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieCountry])],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
