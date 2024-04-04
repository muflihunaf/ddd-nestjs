import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/domain/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/domain/book/dto/updated-book.dto';
import { Book } from '../../domain/book/model/book.model';

@Injectable()
export class DtoToModelTransformer {
  // Method untuk melakukan transformasi dari CreateBookDto ke Book
  transformCreateBookDtoToBook(dto: CreateBookDto): Book {
    const { title, author, code, stock } = dto;
    const book = new Book();
    book.title = title;
    book.author = author;
    book.code = code;
    book.stock = stock;
    return book;
  }

  transformUpdateBookDtoToBook(dto: UpdateBookDto, existingBook: Book): Book {
    const { title, author, code, stock } = dto;

    // Update nilai-nilai yang ada di _doc dari existingBook dengan nilai-nilai baru dari DTO
    if (title !== undefined) {
      existingBook.title = title;
    }
    if (author !== undefined) {
      existingBook.author = author;
    }
    if (code !== undefined) {
      existingBook.code = code;
    }
    if (stock !== undefined) {
      existingBook.stock = stock;
    }

    return existingBook;
  }
}
