// src/domain/services/book.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DtoToModelTransformer } from '../../../infrastructures/transformer/book.transformer';
import { isValidObjectId } from 'mongoose';
import { TransactionRepository } from '../repositories/transaction.repository';
import { MemberRepository } from 'src/domain/member/repositories/member.repository';
import { BookRepository } from 'src/domain/book/repositories/book.repository';
import { Transaction } from '../model/transaction.model';
import { CreateTransactionDto } from '../dto/transaction.dto';
import { ReturnBookDto } from '../dto/returnBook.dto';
import { Book } from 'src/domain/book/model/book.model';
import { Member } from 'src/domain/member/model/member.model';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TransactionRepository')
    private readonly transactionRepository: TransactionRepository,
    @Inject('MemberRepository')
    private readonly memberRepository: MemberRepository,
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository,
    private readonly transformer: DtoToModelTransformer,
  ) {}

  async getAllTransaction(): Promise<Transaction[]> {
    try {
      const books = await this.transactionRepository.findAll();
      return books;
    } catch (error) {
      console.error('Failed to fetch all books:', error);
      throw new Error('Failed to fetch all books: ' + error.message);
    }
  }

  async getByMember(memberId: string): Promise<Transaction[] | null> {
    try {
      if (!isValidObjectId(memberId)) {
        throw new NotFoundException('Invalid member ID');
      }
      const book = await this.transactionRepository.findByMember(memberId);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      throw new NotFoundException(
        'Failed to fetch Transaction by ID: ' + error.message,
      );
    }
  }

  async borrowBook(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { memberId, bookId } = createTransactionDto;

    // Check if member exists
    const member = await this.memberRepository.findById(memberId);
    if (!member) {
      throw new Error('Member not found');
    }

    // Check if member is currently penalized
    if (member.isPenalized) {
      throw new Error('Member is currently penalized');
    }

    // Check if member has already borrowed 2 books
    const borrowedBooksCount =
      await this.transactionRepository.getBorrowedBooksCount(memberId);
    if (borrowedBooksCount >= 2) {
      throw new Error('Member has borrowed maximum number of books');
    }

    // Check if the book is available
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    if (!book.isAvailable) {
      throw new Error('Book is already borrowed by another member');
    }

    // Update book status and member's borrowed books
    // Kurangi stok buku
    book.stock -= 1;

    // Jika stok buku telah menjadi 0, atur isAvailable menjadi false
    if (book.stock === 0) {
      book.isAvailable = false;
    }

    // Simpan perubahan pada buku
    await this.bookRepository.update(bookId, book);

    // Tambahkan buku yang dipinjam ke daftar transaksi
    const transaction = await this.transactionRepository.addBorrowedBook(
      member,
      book,
    );

    return transaction;
  }

  async returnBook(
    transactionId: string,
    returnBook: ReturnBookDto,
  ): Promise<string | null> {
    try {
      // Check if the book was borrowed by the member
      const { returnDate, bookId, memberId } = returnBook;

      const transaction = await this.transactionRepository.findByFilter({
        _id: transactionId,
      });
      if (!transaction) {
        throw new Error('The book was not borrowed by the member');
      }
      if (transaction.isReturned) {
        throw new Error('The book has been returned');
      }

      // Calculate days difference between return date and borrow date
      const daysDifference = Math.ceil(
        (new Date(returnDate).getTime() - transaction.borrowDate.getTime()) /
          (1000 * 3600 * 24),
      );
      const book = await this.bookRepository.findById(bookId);
      book.stock += 1;
      await this.bookRepository.update(bookId, book);
      transaction.isReturned = true;
      await this.transactionRepository.updateTransaction(
        transactionId,
        transaction,
      );

      // Check if the book is returned after more than 7 days
      if (daysDifference > 7) {
        // Apply penalty to the member
        const member = await this.memberRepository.findById(memberId);
        const currentDate = new Date();
        const penalizedDate = new Date(currentDate);
        penalizedDate.setDate(penalizedDate.getDate() + 3);
        member.isPenalized = true;
        member.penalizeEndDate = penalizedDate;
        await this.memberRepository.update(memberId, member);
        return 'Book returned successfully with penalty applied';
      }

      return 'Return without penalty';
    } catch (error) {
      // Tangani kesalahan yang terjadi selama proses
      // Kembalikan null jika terjadi kesalahan
      throw new NotFoundException('Failed to Return Book: ' + error.message);
    }
  }

  async getAvailableBooks(): Promise<Book[]> {
    // Mendapatkan semua buku
    const allBooks = await this.bookRepository.findAll();

    // Mendapatkan ID semua buku yang sedang dipinjam
    const borrowedBookIds =
      await this.transactionRepository.findBorrowedBookId();

    // Filter buku yang tidak sedang dipinjam
    const availableBooks = allBooks.filter(
      (book) => !borrowedBookIds.includes(book.code.toString()),
    );

    return availableBooks;
  }

  async getAllMembersWithBorrowedBooks(): Promise<Member[]> {
    const allMembers = await this.memberRepository.findAll();
    const borrowedBooksCountByMember =
      await this.transactionRepository.findBorrowedBooksCountByMember();
    return allMembers.map((member) => ({
      code: member.code,
      name: member.name,
      isPenalized: member.isPenalized,
      penalizeEndDate: member.penalizeEndDate,
      borrowedBooksCount: borrowedBooksCountByMember.get(member.code) || 0,
    }));
  }
}
