import { Module } from '@nestjs/common'
import { MoviesService } from './services/movies/movies.service'
import { MoviesController } from './controllers/movies/movies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Movie } from '../entities/movie.entity'
import { GenresModule } from 'src/genres/genres.module'
import { CastsModule } from 'src/casts/casts.module'
import { ProductionsModule } from 'src/productions/productions.module'
import { CountriesModule } from 'src/countries/countries.module'
import { UsersModule } from 'src/users/users.module'
import { SearchModule } from 'src/search/search.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    SearchModule,
    GenresModule,
    CastsModule,
    ProductionsModule,
    CountriesModule,
    UsersModule
  ],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}