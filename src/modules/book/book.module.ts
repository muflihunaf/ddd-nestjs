// book/book.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from 'src/application/book.controller';
import { Book, BookSchema } from 'src/domain/book/model/book.model';
// import { BookRepository } from 'src/domain/book/repositories/book.repository';
import { BookService } from 'src/domain/book/services/book.service';
import { MongooseBookRepository } from 'src/infrastructures/repositories/book/book.repository.impl';
import { DtoToModelTransformer } from 'src/infrastructures/transformer/book.transformer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: 'BookRepository',
      useClass: MongooseBookRepository,
    },
    DtoToModelTransformer,
  ],
})
export class BookModule {}
