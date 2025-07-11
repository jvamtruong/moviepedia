import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { User } from 'src/entities/user.entity'
import { errorMessages } from 'src/exception-filters/custom'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    })

    if (!user) {
      throw new NotFoundException(errorMessages.users.userNotFound)
    }
    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
    })
  }

  async save(userDto: AuthDto): Promise<User> {
    const newUser = this.usersRepository.create(userDto)
    return this.usersRepository.save(newUser)
  }
}
