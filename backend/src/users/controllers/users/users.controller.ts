import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from 'src/users/services/users/users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findUserById(@Param('id') id: number) {
    return this.usersService.findById(id)
  }
}
