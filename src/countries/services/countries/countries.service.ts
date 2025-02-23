import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Country } from 'src/entities/country.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findOrCreateCountry(country: Country): Promise<Country> {
    const existingCountry = await this.countryRepository.findOne({
      where: { name: country.name },
    })
    if (existingCountry) return existingCountry
    return this.countryRepository.save(country)
  }
}
