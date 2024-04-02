// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
// import { BookModule } from './books/book.module';
// import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    // BookModule,
    // UserModule,
  ],
})
export class AppModule {}
