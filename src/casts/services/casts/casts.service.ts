import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Cast } from 'src/entities/cast.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CastsService {
  constructor(
    @InjectRepository(Cast)
    private readonly castRepository: Repository<Cast>,
  ) {}

  async findOrCreateCast(cast: Cast): Promise<Cast> {
    const existingCast = await this.castRepository.findOne({
      where: { name: cast.name },
    })
    if (existingCast) return existingCast
    return this.castRepository.save(cast)
  }
}
