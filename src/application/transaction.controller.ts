// src/application/controllers/book.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Book } from 'src/domain/book/model/book.model';
import { CreateMemberDto } from 'src/domain/member/dto/create-member.dto';
import { UpdateMemberDto } from 'src/domain/member/dto/updated-member.dto';
import { Member } from 'src/domain/member/model/member.model';
import { ReturnBookDto } from 'src/domain/transaction/dto/returnBook.dto';
import { CreateTransactionDto } from 'src/domain/transaction/dto/transaction.dto';
import { Transaction } from 'src/domain/transaction/model/transaction.model';
import { TransactionService } from 'src/domain/transaction/services/transaction.services';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransaction(): Promise<Transaction[]> {
    return this.transactionService.getAllTransaction();
  }

  @Get('availableBook')
  async getAvalilableBook(): Promise<Book[]> {
    return this.transactionService.getAvailableBooks();
  }

  @Get('member')
  async getMemberBorrow(): Promise<Member[]> {
    return this.transactionService.getAllMembersWithBorrowedBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Transaction[] | null> {
    return this.transactionService.getByMember(id);
  }

  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.borrowBook(createTransactionDto);
  }

  @Put(':id')
  async returnBook(
    @Param('id') id: string,
    @Body() returnBookDto: ReturnBookDto,
  ): Promise<string | null> {
    return this.transactionService.returnBook(id, returnBookDto);
  }
}
