import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Movie } from 'src/entities/movie.entity'

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexMovie(movie: Movie): Promise<void> {
    if (!this.elasticsearchService.indices.exists({ index: 'movies_v2' })) {
      await this.createIndex('movies_v2')
    }
    await this.elasticsearchService.index({
      index: 'movies_v2',
      id: movie.id.toString(),
      body: {
        title: movie.title,
      },
    })
  }

  async search(query: string): Promise<number[]> {
    const response = await this.elasticsearchService.search({
      index: 'movies_v2',
      body: {
        query: {
          bool: {
            should: [
              {
                multi_match: {
                  query,
                  type: 'bool_prefix',
                  operator: 'AND',
                  fuzziness: 'AUTO',
                  fuzzy_transpositions: true,
                  max_expansions: 50,
                  fields: ['title', 'title._2gram', 'title._3gram'],
                },
              },
              {
                match: {
                  title: {
                    query,
                    boost: 0.1,
                  },
                },
              },
            ],
          },
        },
        size: 10000,
      },
    })

    return response.hits.hits.map((hit: any) => parseInt(hit._id))
  }

  async bulkIndexMovies(index: string, movies: Movie[]): Promise<void> {
    if (!this.elasticsearchService.indices.exists({ index })) {
      await this.createIndex(index)
    }
    const body = movies.flatMap((movie) => [
      { index: { _index: index, _id: movie.id.toString() } },
      {
        title: movie.title,
      },
    ])
    const result = await this.elasticsearchService.bulk({ refresh: true, body })
    if (result.errors) {
      throw new Error('errors in bulkIndexMovies')
    }
  }

  private async createIndex(index: string): Promise<void> {
    await this.elasticsearchService.indices.create({
      index,
      mappings: {
        properties: {
          title: {
            type: 'search_as_you_type',
            max_shingle_size: 3,
          },
        },
      },
    })
  }
}
