import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common'
import { MoviesService } from 'src/movies/services/movies/movies.service'

@Controller('movie')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
  ) {}

  @Get()
  getAllMovies(@Query('page', ParseIntPipe) page: number) {
    return this.moviesService.getMovies(page)
  }

  @Get('search')
  getSearchResults(@Query('q') q: string) {
    return this.moviesService.getSearchResults(q)
  }

}