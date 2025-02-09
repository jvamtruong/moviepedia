import { Module } from '@nestjs/common';
import { ElasticService } from './services/elastic/elastic.service';

@Module({
  providers: [ElasticService],
  exports: [ElasticService],
})
export class ElasticsearchModule {}
