import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common'
import { Response, Request } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const res = ctx.getResponse<Response>()
    if (exception instanceof HttpException) {
      const status = exception.getStatus()
      this.logger.error(
        `${req.method} ${req.originalUrl} ${status} error: ${exception.message}`,
      )
      const details = exception.getResponse()
      res.status(status).json({ isFailed: true, details })
    } else {
      this.logger.error(
        `${req.method} ${req.originalUrl} error: ${exception.message}`,
      )
      res.status(500).json({ isFailed: true, details: exception.message })
    }
  }
}
