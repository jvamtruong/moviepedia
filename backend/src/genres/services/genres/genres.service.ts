import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Genre } from 'src/entities/genre.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find()
  }

  async findOrCreateGenre(genre: Genre): Promise<Genre> {
    const existingGenre = await this.genreRepository.findOne({
      where: { name: genre.name },
    })
    if (existingGenre) return existingGenre
    return this.genreRepository.save(genre)
  }
}
