import { Client } from '@elastic/elasticsearch'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElasticService {
  private readonly client: Client

  constructor() {
    this.client = new Client({ node: 'http://localhost:9200' })
  }

  async search(query: string): Promise<number[]> {
    const response = await this.client.search({
      index: 'movies',
      body: { query: { match: { name: query } } },
    })
    const hits = response.hits.hits.map((hit: any) => ({
      id: parseInt(hit._id),
      name: hit._source.name,
    }))

    return hits.map(hit => hit.id)
  }
}
