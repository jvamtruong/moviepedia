import { Module } from '@nestjs/common'
import { SearchService } from './services/search/search.service'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('elasticsearch.node'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
