import { Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import * as crypto from 'crypto'

@Injectable()
export class AppService {
  constructor(
    @Inject(CACHE_MANAGER) 
    private readonly cacheManager: Cache
  ) {}
  getHello(): string {
    return 'Hello World!'
  }

  async test() {
    const refreshToken = crypto.randomBytes(32).toString('hex')
    return {
      refreshToken,
      len: refreshToken.length,
    }
  }
}
