import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Production } from 'src/entities/production.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ProductionsService {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
  ) {}

  async findOrCreateProduction(production: Production): Promise<Production> {
    const existingProduction = await this.productionRepository.findOne({
      where: { name: production.name },
    })
    if (existingProduction) return existingProduction
    return this.productionRepository.save(production)
  }
}
