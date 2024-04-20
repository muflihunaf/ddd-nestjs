import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from 'src/domain/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/domain/book/dto/updated-book.dto';
import { Book } from 'src/domain/book/model/book.model';
import { BookService } from 'src/domain/book/services/book.service';

@ApiTags('book')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return All Book' })
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return Book By Id' })
  async getBookById(@Param('id') id: string): Promise<Book | null> {
    return this.bookService.getBookById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create A New Book' })
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(createBookDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update Book' })
  async updateBook(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
  ): Promise<Book | null> {
    return this.bookService.updateBook(id, book);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete Book' })
  async deleteBook(@Param('id') id: string): Promise<Book | null> {
    return this.bookService.deleteBook(id);
  }
}
