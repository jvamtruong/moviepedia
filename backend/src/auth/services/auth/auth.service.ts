import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Cache } from 'cache-manager'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { errorMessages } from 'src/exception-filters/custom'
import { UsersService } from 'src/users/services/users/users.service'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

type Payload = {
  sub: number
  role: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: AuthDto) {
    const { email, password } = loginDto
    const existingUser = await this.usersService.findByEmail(email)
    if (!existingUser) {
      throw new UnauthorizedException(errorMessages.auth.wrongCredentials)
    }
    if (!(await existingUser.validatePassword(password))) {
      throw new UnauthorizedException(errorMessages.auth.wrongCredentials)
    }

    const payload: Payload = {
      sub: existingUser.id,
      role: existingUser.role,
    }
    const { accessToken, refreshToken } = await this.generateTokens(payload)
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.cacheManager.set(
      `refresh_token:${payload.sub}`,
      hashedRefreshToken,
      7 * 24 * 60 * 60 * 1000,
    )

    return { accessToken, refreshToken }
  }

  async register(createUserDto: AuthDto) {
    const { email } = createUserDto
    const existingUser = await this.usersService.findByEmail(email)
    if (existingUser) {
      throw new UnauthorizedException(errorMessages.auth.userAlreadyExists)
    }
    const newUser = await this.usersService.save(createUserDto)

    const payload: Payload = {
      sub: newUser.id,
      role: newUser.role,
    }

    const { accessToken, refreshToken } = await this.generateTokens(payload)
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.cacheManager.set(
      `refresh_token:${payload.sub}`,
      hashedRefreshToken,
      7 * 24 * 60 * 60 * 1000,
    )

    return { accessToken, refreshToken }
  }

  async refreshTokens(oldRefreshToken: string, payload: Payload) {
    const hashedRefreshToken = await this.cacheManager.get<string>(
      `refresh_token:${payload.sub}`,
    )
    if (!hashedRefreshToken) {
      throw new UnauthorizedException(errorMessages.auth.expiredToken)
    }

    if (!(await bcrypt.compare(oldRefreshToken, hashedRefreshToken))) {
      throw new UnauthorizedException(errorMessages.auth.invalidToken)
    }

    const { accessToken, refreshToken } = await this.generateTokens(payload)
    await this.cacheManager.set(
      `refresh_token:${payload.sub}`,
      await bcrypt.hash(refreshToken, 10),
      7 * 24 * 60 * 60 * 1000,
    )
    return { accessToken, refreshToken }
  }

  async logout(accessToken: string) {
    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: this.configService.get<string>('jwt.accessSecret'),
    })
    const signature: string = accessToken.split('.')[2]
    const expiresIn = payload.exp * 1000 - Date.now()
    if (expiresIn > 0) {
      await this.cacheManager.set(
        `blacklist:${payload.sub}:${signature}`,
        true,
        expiresIn,
      )
    }
    await this.cacheManager.del(`refresh_token:${payload.sub}`)
  }

  private async generateTokens(payload: Payload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.accessSecret'),
      expiresIn: '15m',
    })

    const refreshToken = crypto.randomBytes(32).toString('hex')

    return { accessToken, refreshToken }
  }
}
