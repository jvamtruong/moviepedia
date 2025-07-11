import { Module } from '@nestjs/common'
import { AuthService } from './services/auth/auth.service'
import { AuthController } from './controllers/auth/auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
