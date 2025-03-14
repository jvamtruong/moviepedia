import { Controller, Get, Query, ParseIntPipe, Post, Param } from '@nestjs/common'
import { MoviesService } from 'src/movies/services/movies/movies.service'

@Controller('movie')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
  ) {}

  @Post('bulk-insert')
  bulkInsertMoviesFromRawFiles() {
    return this.moviesService.saveMoviesFromRawFiles()
  }

  @Post('bulk-index/:index')
  bulkIndexMoviesToElastic(@Param('index') index: string) {
    return this.moviesService.saveMoviesToElastic(index)
  }

  @Get()
  getAllMovies(@Query('page', ParseIntPipe) page: number) {
    return this.moviesService.getMovies(page)
  }

  @Get('search')
  getSearchResults(@Query('q') q: string) {
    return this.moviesService.getSearchResults(q)
  }
}