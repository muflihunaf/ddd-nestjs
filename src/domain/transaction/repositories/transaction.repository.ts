import { Member } from 'src/domain/member/model/member.model';
import { Transaction } from '../model/transaction.model';
import { Book } from 'src/domain/book/model/book.model';

// domain/book/repositories/book.repository.ts
export interface TransactionRepository {
  findAll(): Promise<Transaction[]>;
  findByMember(id: string): Promise<Transaction[] | null>;
  create(transaction: Transaction): Promise<Transaction>;
  returnBook(id: string): Promise<Transaction | null>;
  getBorrowedBooksCount(memberId: string): Promise<number | null>;
  addBorrowedBook(memberId: Member, bookId: Book): Promise<Transaction | null>;
}
