// infrastructures/repositories/book/book.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookRepository } from '../../../domain/book/repositories/book.repository';
import { Book, BookDocument } from 'src/domain/book/model/book.model';

@Injectable()
export class MongooseBookRepository implements BookRepository {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  async create(book: Book): Promise<Book> {
    return this.bookModel.create(book);
  }

  async update(id: string, book: Book): Promise<Book | null> {
    return this.bookModel
      .findByIdAndUpdate({ _id: id }, book, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Book | null> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}
