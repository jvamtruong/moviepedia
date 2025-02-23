import { Module } from '@nestjs/common'
import { CountriesService } from './services/countries/countries.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Country } from 'src/entities/country.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
