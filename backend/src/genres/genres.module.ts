import { Module } from '@nestjs/common'
import { GenresService } from './services/genres/genres.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Genre } from 'src/entities/genre.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenresService],
  exports: [GenresService],
})
export class GenresModule {}
