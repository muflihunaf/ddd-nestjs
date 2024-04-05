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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from 'src/domain/book/model/book.model';
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
  @ApiResponse({ status: 200, description: 'Get All Transaction' })
  async getAllTransaction(): Promise<Transaction[]> {
    return this.transactionService.getAllTransaction();
  }

  @Get('availableBook')
  @ApiResponse({
    status: 200,
    description: 'Get Available Book || status Book is not available',
  })
  async getAvalilableBook(): Promise<Book[]> {
    return this.transactionService.getAvailableBooks();
  }

  @Get('member')
  @ApiResponse({ status: 200, description: 'Get Member Who Borrow A Book' })
  async getMemberBorrow(): Promise<Member[]> {
    return this.transactionService.getAllMembersWithBorrowedBooks();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get Transaction By Id' })
  async getTransactionById(
    @Param('id') id: string,
  ): Promise<Transaction[] | null> {
    return this.transactionService.getByMember(id);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Create A Transaction' })
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.borrowBook(createTransactionDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Return A Book' })
  async returnBook(
    @Param('id') id: string,
    @Body() returnBookDto: ReturnBookDto,
  ): Promise<string | null> {
    return this.transactionService.returnBook(id, returnBookDto);
  }
}
