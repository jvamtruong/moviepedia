import { Module } from '@nestjs/common'
import { ProductionsService } from './services/productions/productions.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Production } from 'src/entities/production.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Production])],
  providers: [ProductionsService],
  exports: [ProductionsService],
})
export class ProductionsModule {}
