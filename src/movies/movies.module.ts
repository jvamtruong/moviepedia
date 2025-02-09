import { Module } from '@nestjs/common'
import { MoviesService } from './services/movies/movies.service'
import { MoviesController } from './controllers/movies/movies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Movie } from '../entities/movie.entity'
import { ElasticsearchModule } from 'src/elasticsearch/elasticsearch.module'

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), ElasticsearchModule],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
