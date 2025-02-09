import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ElasticService } from 'src/elasticsearch/services/elastic/elastic.service'
import { Movie } from 'src/entities/movie.entity'
import { In, Repository } from 'typeorm'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly searchService: ElasticService,
  ) {}

  async getMovies(page: number): Promise<Movie[]> {
    return this.movieRepository.find({
      skip: (page - 1) * 32,
      take: 32,
    })
  }

  async getSearchResults(query: string): Promise<Movie[]> {
    const moviesIds = await this.searchService.search(query)
    return this.movieRepository.find({
      where: {
        id: In(moviesIds),
      },
    })
  }
}