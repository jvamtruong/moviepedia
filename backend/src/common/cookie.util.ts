import { Response } from 'express'

export class CookieUtil {
  static setRefreshTokenCookie(res: Response, refreshToken: string, expires: Date) {
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/v1/auth/refresh',
      expires: expires,
    })
  }

  static clearRefreshTokenCookie(res: Response) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      path: '/api/v1/auth/refresh',
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
  }
}
