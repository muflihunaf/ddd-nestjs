import { Book } from '../model/book.model';

// domain/book/repositories/book.repository.ts
export interface BookRepository {
  findAll(): Promise<Book[]>;
  findById(id: string): Promise<Book | null>;
  create(book: Book): Promise<Book>;
  update(id: string, book: Book): Promise<Book | null>;
  delete(id: string): Promise<Book | null>;
}
