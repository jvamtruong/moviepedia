import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cast } from 'src/entities/cast.entity'
import { Genre } from 'src/entities/genre.entity'
import { MovieCast } from 'src/entities/movie-cast.entity'
import { MovieGenre } from 'src/entities/movie-genre.entity'
import { Movie } from 'src/entities/movie.entity'
import { In, Repository } from 'typeorm'
import { DataSource } from 'typeorm'
import { MovieCountry } from 'src/entities/movie-country.entity'
import { Country } from 'src/entities/country.entity'
import { MovieProduction } from 'src/entities/movie-production.entity'
import { Production } from 'src/entities/production.entity'
import * as fs from 'fs'
import * as readline from 'readline'
import { RawMovieDto } from 'src/movies/dto/raw-movie.dto'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { SearchService } from 'src/search/services/search/search.service'
import { errorMessages } from 'src/exception-filters/custom'

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    private readonly dataSource: DataSource,
    private readonly searchService: SearchService,
  ) {}

  async getMoviesByPage(page: number): Promise<Movie[]> {
    return this.movieRepository.find({
      skip: (page - 1) * 32,
      take: 32,
      relations: ['casts', 'casts.cast'],
    })
  }

  async getTopSearchResults(query: string) {
    const movieIds = await this.searchService.search(query)
    const top10MovieIds = movieIds.slice(0, 10)
    const matchingMovies = await this.movieRepository.find({
      where: {
        id: In(top10MovieIds),
      },
      select: ['id', 'title', 'src'],
    })

    if (matchingMovies.length === 0) {
      throw new NotFoundException(errorMessages.movies.movieNotFound)
    }
    const movieMapper = new Map<number, Movie>()
    matchingMovies.forEach((movie) => movieMapper.set(movie.id, movie))
    const sortedMovies = top10MovieIds.map((movieId) =>
      movieMapper.get(movieId),
    )

    await this.cacheManager.set(`search_results:${query}`, movieIds, 60_000)

    return {
      total: sortedMovies.length,
      results: sortedMovies,
    }
  }

  async getAllSearchResults(query: string) {
    const cachedResults = await this.cacheManager.get<number[]>(
      `search_results:${query}`,
    )
    if (cachedResults) {
      const matchingMovies = await this.movieRepository.find({
        where: {
          id: In(cachedResults),
        },
        select: ['id', 'title', 'src'],
      })
      if (matchingMovies.length === 0) {
        throw new NotFoundException(errorMessages.movies.movieNotFound)
      }
      const movieMapper = new Map<number, Movie>()
      matchingMovies.forEach((movie) => movieMapper.set(movie.id, movie))
      const sortedMovies = cachedResults.map((movieId) =>
        movieMapper.get(movieId),
      )
      return sortedMovies
    }
    const movieIds = await this.searchService.search(query)
    const matchingMovies = await this.movieRepository.find({
      where: {
        id: In(movieIds),
      },
      select: ['id', 'title', 'src'],
    })
    if (matchingMovies.length === 0) {
      throw new NotFoundException(errorMessages.movies.movieNotFound)
    }
    const movieMapper = new Map<number, Movie>()
    matchingMovies.forEach((movie) => movieMapper.set(movie.id, movie))
    const sortedMovies = movieIds.map((movieId) => movieMapper.get(movieId))
    return sortedMovies
  }

  async saveMoviesToElastic(index: string): Promise<void> {
    const movies = await this.movieRepository.find()
    await this.searchService.bulkIndexMovies(index, movies)
  }

  async saveMoviesFromRawFiles(): Promise<void> {
    const filePath =
      'C:\\Users\\jvamt\\Desktop\\moviepedia-backend\\data\\tv_show_final_results.jsonl'

    const fileStream = fs.createReadStream(filePath)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })
    console.log('reading jsonl file')
    let batch: RawMovieDto[] = []

    rl.on('line', async (line) => {
      try {
        if (line.trim() === '') return
        batch.push(JSON.parse(line))
      } catch (error) {
        console.error(error)
      }
    })

    rl.on('close', async () => {
      console.log('closing jsonl file')
      if (batch.length > 0) {
        await this.processBatch(batch)
      }
      console.log('done')
    })

    rl.on('error', (err) => {
      console.error(err)
    })
  }

  private async processBatch(batch: RawMovieDto[]) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const newMovies: Movie[] = []
      const rawGenres = new Set<string>()
      const rawCasts = new Set<string>()
      const rawCountries = new Set<string>()
      const rawProductions = new Set<string>()

      for (const rawMovie of batch) {
        rawMovie.casts.forEach((c) => rawCasts.add(c))
        rawMovie.genres.forEach((g) => rawGenres.add(g))
        rawMovie.countries.forEach((c) => rawCountries.add(c))
        rawMovie.productions.forEach((p) => rawProductions.add(p))
      }
      const nonDuplicatedCasts = [...rawCasts]
      const nonDuplicatedGenres = [...rawGenres]
      const nonDuplicatedCountries = [...rawCountries]
      const nonDuplicatedProductions = [...rawProductions]
      const casts = await queryRunner.manager.find(Cast, { select: ['name'] })
      const genres = await queryRunner.manager.find(Genre, { select: ['name'] })
      const countries = await queryRunner.manager.find(Country, {
        select: ['name'],
      })
      const productions = await queryRunner.manager.find(Production, {
        select: ['name'],
      })

      const existingCastNames = new Set<string>(casts.map((cast) => cast.name))

      const nonExistingCasts = nonDuplicatedCasts
        .filter((c) => !existingCastNames.has(c))
        .map((castName) => {
          const cast = new Cast()
          cast.name = castName
          return cast
        })

      const existingGenreNames = new Set<string>(
        genres.map((genre) => genre.name),
      )
      const nonExistingGenres = nonDuplicatedGenres
        .filter((g) => !existingGenreNames.has(g))
        .map((genreName) => {
          const genre = new Genre()
          genre.name = genreName
          return genre
        })

      const existingCountryNames = new Set<string>(
        countries.map((country) => country.name),
      )
      const nonExistingCountries = nonDuplicatedCountries
        .filter((c) => !existingCountryNames.has(c))
        .map((countryName) => {
          const country = new Country()
          country.name = countryName
          return country
        })

      const existingProductionNames = new Set<string>(
        productions.map((production) => production.name),
      )
      const nonExistingProductions = nonDuplicatedProductions
        .filter((p) => !existingProductionNames.has(p))
        .map((productionName) => {
          const production = new Production()
          production.name = productionName
          return production
        })

      const promiseSettledResults = await Promise.allSettled([
        queryRunner.manager.save(nonExistingCasts),
        queryRunner.manager.save(nonExistingGenres),
        queryRunner.manager.save(nonExistingCountries),
        queryRunner.manager.save(nonExistingProductions),
      ])
      for (const promiseSettledResult of promiseSettledResults) {
        if (promiseSettledResult.status === 'rejected') {
          throw new Error(promiseSettledResult.reason)
        }
      }

      console.log('done saving casts, genres, countries, productions')

      for (const rawMovie of batch) {
        const movie = new Movie()
        movie.title = rawMovie.title
        movie.description = rawMovie.description
        movie.src = rawMovie.src
        movie.poster = rawMovie.poster
        movie.duration = rawMovie.duration.replace('min', '')
        movie.seasons = rawMovie.seasons
        movie.imdbRating = rawMovie.imdbRating
        movie.releasedAt = rawMovie.releasedAt
        const genres = await queryRunner.manager.find(Genre, {
          where: {
            name: In(rawMovie.genres),
          },
        })
        movie.genres = genres.map((genre) => {
          const movieGenre = new MovieGenre()
          movieGenre.genre = genre
          return movieGenre
        })
        const casts = await queryRunner.manager.find(Cast, {
          where: {
            name: In(rawMovie.casts),
          },
        })
        movie.casts = casts.map((cast) => {
          const movieCast = new MovieCast()
          movieCast.cast = cast
          return movieCast
        })
        const countries = await queryRunner.manager.find(Country, {
          where: {
            name: In(rawMovie.countries),
          },
        })
        movie.countries = countries.map((country) => {
          const movieCountry = new MovieCountry()
          movieCountry.country = country
          return movieCountry
        })
        const productions = await queryRunner.manager.find(Production, {
          where: {
            name: In(rawMovie.productions),
          },
        })
        movie.productions = productions.map((production) => {
          const movieProduction = new MovieProduction()
          movieProduction.production = production
          return movieProduction
        })
        movie.episodes = rawMovie.episodes
        newMovies.push(movie)
      }
      const batchSize = 100
      for (let i = 0; i < newMovies.length; i += batchSize) {
        const chunk = newMovies.slice(i, i + batchSize)
        await queryRunner.manager.save(chunk)
      }
      await queryRunner.commitTransaction()
    } catch (error) {
      console.error(error.message)
      console.log('ERORRRRRRRRRRRRRRRRRRRR')
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }
}
