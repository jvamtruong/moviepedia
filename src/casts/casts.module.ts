import { Module } from '@nestjs/common'
import { CastsService } from './services/casts/casts.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cast } from 'src/entities/cast.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Cast])],
  providers: [CastsService],
  exports: [CastsService],
})
export class CastsModule {}
