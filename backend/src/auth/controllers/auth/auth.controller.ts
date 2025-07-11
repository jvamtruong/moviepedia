import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Res,
  Post,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { Auth } from 'src/auth/guards/auth.decorator'
import { CurrentUser } from 'src/auth/guards/current-user.decorator'
import { AuthService } from 'src/auth/services/auth/auth.service'
import { CookieUtil } from 'src/common/cookie.util'
import { Cookies } from 'src/common/cookies.decorator'
import { Headers } from 'src/common/headers.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(loginDto)
    CookieUtil.setRefreshTokenCookie(
      res,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    )
    return { accessToken, refreshToken }
  }

  @Post('register')
  async register(
    @Body() createUserDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.register(createUserDto)
    CookieUtil.setRefreshTokenCookie(
      res,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    )
    return { accessToken, refreshToken }
  }

  @Auth('admin', 'user')
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Cookies('refresh_token') refreshTokenFromCookie: string,
    @CurrentUser() user: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const payload = {
      sub: user.id,
      role: user.role,
    }
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      refreshTokenFromCookie,
      payload,
    )
    CookieUtil.setRefreshTokenCookie(
      res,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    )
    return { accessToken, refreshToken }
  }

  @Auth('admin', 'user')
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Headers('authorization') accessToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    CookieUtil.clearRefreshTokenCookie(res)
    await this.authService.logout(accessToken)
    return { message: 'Logged out successfully' }
  }
}
