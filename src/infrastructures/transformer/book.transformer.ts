import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/domain/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/domain/book/dto/updated-book.dto';
import { Book } from '../../domain/book/model/book.model';

@Injectable()
export class DtoToModelTransformer {
  // Method untuk melakukan transformasi dari CreateBookDto ke Book
  transformCreateBookDtoToBook(dto: CreateBookDto): Book {
    const { title, author, pages, year } = dto;
    const book = new Book();
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.year = year;
    return book;
  }

  transformUpdateBookDtoToBook(dto: UpdateBookDto, existingBook: Book): Book {
    const { title, author, pages, year } = dto;

    // Update nilai-nilai yang ada di _doc dari existingBook dengan nilai-nilai baru dari DTO
    if (title !== undefined) {
      existingBook.title = title;
    }
    if (author !== undefined) {
      existingBook.author = author;
    }
    if (pages !== undefined) {
      existingBook.pages = pages;
    }
    if (year !== undefined) {
      existingBook.year = year;
    }

    console.log(existingBook);
    return existingBook;
  }
}
