import { Controller, Get, Query, Post, Param } from '@nestjs/common'
import { Auth } from 'src/auth/guards/auth.decorator'
import { MoviesService } from 'src/movies/services/movies/movies.service'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Auth('admin')
  @Post('bulk-insert')
  bulkInsertMoviesFromRawFiles() {
    return this.moviesService.saveMoviesFromRawFiles()
  }

  @Auth('admin')
  @Post('bulk-index/:index')
  bulkIndexMoviesToElastic(@Param('index') index: string) {
    return this.moviesService.saveMoviesToElastic(index)
  }

  @Get()
  getMoviesByPage(@Query('page') page: number) {
    return this.moviesService.getMoviesByPage(page)
  }

  @Get('search')
  getTopSearchResults(@Query('q') q: string) {
    return this.moviesService.getTopSearchResults(q)
  }

  @Get('search-all')
  getAllSearchResults(@Query('q') q: string) {
    return this.moviesService.getAllSearchResults(q)
  }
}
