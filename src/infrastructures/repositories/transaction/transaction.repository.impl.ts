// infrastructures/repositories/book/book.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/domain/book/model/book.model';
import { Member } from 'src/domain/member/model/member.model';
import {
  Transaction,
  TransactionDocument,
} from 'src/domain/transaction/model/transaction.model';
import { TransactionRepository } from 'src/domain/transaction/repositories/transaction.repository';

@Injectable()
export class MongooseTransactionRepository implements TransactionRepository {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}
  getBorrowedBooksCount(memberId: string): Promise<number> {
    return this.transactionModel
      .find({ member: memberId })
      .countDocuments()
      .exec();
  }
  async addBorrowedBook(memberId: Member, bookId: Book): Promise<Transaction> {
    const currentDate = new Date();
    const returnDate = new Date(currentDate);
    returnDate.setDate(returnDate.getDate() + 7); // Tambahkan 7 hari untuk tanggal pengembalian

    const transaction: Transaction = {
      member: memberId,
      book: bookId,
      borrowDate: currentDate,
      returnDate: returnDate,
      isReturned: false,
    };

    return this.transactionModel.create(transaction);
  }
  create(transaction: Transaction): Promise<Transaction> {
    return this.transactionModel.create(transaction);
  }

  async findByMember(id: string): Promise<Transaction[]> {
    return this.transactionModel.find({ member: id }).exec();
  }
  async returnBook(id: string): Promise<Transaction> {
    return this.transactionModel.findByIdAndUpdate(
      id,
      { isReturned: true, returnDate: new Date() },
      { new: true },
    );
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel
      .find()
      .populate('member')
      .populate('book')
      .exec();
  }
}
