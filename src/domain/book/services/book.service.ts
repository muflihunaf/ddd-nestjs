// src/domain/services/book.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from '../repositories/book.repository';
import { Book } from '../model/book.model';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/updated-book.dto';
import { DtoToModelTransformer } from '../../../infrastructures/transformer/book.transformer';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @Inject('BookRepository') private readonly bookRepository: BookRepository,
    private readonly transformer: DtoToModelTransformer,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    try {
      const books = await this.bookRepository.findAll();
      return books;
    } catch (error) {
      console.error('Failed to fetch all books:', error);
      throw new Error('Failed to fetch all books: ' + error.message);
    }
  }

  async getBookById(id: string): Promise<Book | null> {
    try {
      if (!isValidObjectId(id)) {
        throw new NotFoundException('Invalid book ID');
      }
      const book = await this.bookRepository.findById(id);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      throw new NotFoundException(
        'Failed to fetch book by ID: ' + error.message,
      );
    }
  }

  async createBook(book: CreateBookDto): Promise<Book> {
    try {
      const bookDto = this.transformer.transformCreateBookDtoToBook(book);
      const newBook = await this.bookRepository.create(bookDto);
      return newBook;
    } catch (error) {
      throw new Error('Failed to create book: ' + error.message);
    }
  }

  async updateBook(id: string, book: UpdateBookDto): Promise<Book | null> {
    try {
      // Coba untuk mendapatkan buku yang akan diperbarui
      const existingBook = await this.getBookById(id);

      if (!existingBook) {
        // Jika buku tidak ditemukan, lemparkan pengecualian dengan pesan yang sesuai
        throw new NotFoundException('Book not found');
      }

      // Transformasikan DTO pembaruan menjadi model buku yang baru
      const updatedBook = this.transformer.transformUpdateBookDtoToBook(
        book,
        existingBook,
      );

      // Perbarui buku dalam penyimpanan data
      const savedBook = await this.bookRepository.update(id, updatedBook);

      return savedBook;
    } catch (error) {
      // Tangani kesalahan yang terjadi selama proses
      // Kembalikan null jika terjadi kesalahan
      throw new NotFoundException(
        'Failed to fetch book by ID: ' + error.message,
      );
    }
  }

  async deleteBook(id: string): Promise<Book | null> {
    try {
      if (!isValidObjectId(id)) {
        throw new NotFoundException('Invalid book ID');
      }
      return await this.bookRepository.delete(id);
    } catch (err) {
      throw new Error('Failed to delete book. ' + err.message);
    }
  }
}
