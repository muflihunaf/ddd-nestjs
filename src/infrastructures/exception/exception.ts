import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Atur status kode standar untuk kesalahan server (500) jika tidak ada yang ditentukan
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Membuat objek respons JSON dengan pesan kesalahan
    const jsonResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || 'Internal server error',
      fields: exception.response?.message || [],
    };

    // Mencetak pesan kesalahan ke konsol
    // console.error(exception);

    // Memberikan respons dengan objek JSON
    response.status(status).json(jsonResponse);
  }
}
