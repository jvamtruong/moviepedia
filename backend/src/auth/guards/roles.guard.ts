import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { errorMessages } from 'src/exception-filters/custom'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (roles.length === 0) return true
    const request = context.switchToHttp().getRequest()
    const user = request.user
    if (!roles.includes(user.role)) {
      throw new UnauthorizedException(errorMessages.auth.notAllowed)
    }
    return true
  }
}
