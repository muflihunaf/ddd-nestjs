// src/domain/services/book.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DtoToModelTransformer } from '../../../infrastructures/transformer/book.transformer';
import { isValidObjectId } from 'mongoose';
import { TransactionRepository } from '../repositories/transaction.repository';
import { MemberRepository } from 'src/domain/member/repositories/member.repository';
import { Book } from 'src/domain/book/model/book.model';
import { BookRepository } from 'src/domain/book/repositories/book.repository';
import { Transaction } from '../model/transaction.model';
import { CreateTransactionDto } from '../dto/transaction.dto';

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
        'Failed to fetch book by ID: ' + error.message,
      );
    }
  }

  async borrowBook(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    // Check if member exists
    const { memberId, bookId } = createTransactionDto;
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
    // await this.bookRepository.updateBookStatus(bookId, false);
    const transaction = await this.transactionRepository.addBorrowedBook(
      member,
      book,
    );

    return transaction;
  }

  // async returnBook(
  //   transactionId: string,
  //   memberId: string,
  //   bookId: string,
  //   returnDate: Date,
  // ): Promise<Book | null> {
  //   try {
  //     const member = await this.memberRepository.findById(memberId);
  //     if (!member) {
  //       throw new Error('Member not found');
  //     }
  //     const book = await this.bookRepository.findById(bookId);
  //     if (!member) {
  //       throw new Error('Member not found');
  //     }

  //     // Check if the book was borrowed by the member
  //     const isBorrowed =
  //       await this.transactionRepository.isBookBorrowedByMember(
  //         member,
  //         book,
  //       );
  //     if (!isBorrowed) {
  //       throw new Error('The book was not borrowed by the member');
  //     }

  //     // Calculate days difference between return date and borrow date
  //     const borrowDate = await this.transactionRepository.getBorrowDate(
  //       memberId,
  //       bookId,
  //     );
  //     const daysDifference = Math.ceil(
  //       (returnDate.getTime() - borrowDate.getTime()) / (1000 * 3600 * 24),
  //     );

  //     // Check if the book is returned after more than 7 days
  //     if (daysDifference > 7) {
  //       // Apply penalty to the member
  //       await this.memberService.applyPenalty(memberId);
  //       return 'Book returned successfully with penalty applied';
  //     }

  //     return 'Book returned successfully';
  //   } catch (error) {
  //     // Tangani kesalahan yang terjadi selama proses
  //     // Kembalikan null jika terjadi kesalahan
  //     throw new NotFoundException(
  //       'Failed to fetch book by ID: ' + error.message,
  //     );
  //   }
  // }
}
