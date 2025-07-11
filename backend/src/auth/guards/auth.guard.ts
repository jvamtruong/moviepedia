import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import { Cache } from 'cache-manager'
import { errorMessages } from 'src/exception-filters/custom'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest()
      const bearerToken: string = request.headers.authorization.split(' ')[1]
      const signature = bearerToken.split('.')[2]
      const payload = await this.jwtService.verifyAsync(bearerToken, {
        secret: this.configService.get<string>('jwt.accessSecret'),
      })
      const isInvalid = await this.cacheManager.get<boolean>(
        `blacklist:${payload.sub}:${signature}`,
      )
      if (isInvalid) {
        throw new UnauthorizedException(errorMessages.auth.invalidToken)
      }

      request.user = {
        id: payload.sub,
        role: payload.role,
      }
      return true
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException(errorMessages.auth.expiredToken)
      throw new UnauthorizedException(errorMessages.auth.invalidToken)
    }
  }
}