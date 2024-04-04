// book/book.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberController } from 'src/application/member.controller';
import { TransactionController } from 'src/application/transaction.controller';
import { Book, BookSchema } from 'src/domain/book/model/book.model';
import { Member, MemberSchema } from 'src/domain/member/model/member.model';
import { MemberService } from 'src/domain/member/services/member.service';
import { Transaction, TransactionSchema } from 'src/domain/transaction/model/transaction.model';
import { TransactionService } from 'src/domain/transaction/services/transaction.services';
import { MongooseBookRepository } from 'src/infrastructures/repositories/book/book.repository.impl';
import { MongooseMemberRepository } from 'src/infrastructures/repositories/member/member.repository.impl';
import { MongooseTransactionRepository } from 'src/infrastructures/repositories/transaction/transaction.repository.impl';
import { DtoToModelTransformer } from 'src/infrastructures/transformer/book.transformer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Member.name, schema: MemberSchema },
      { name: Book.name, schema: BookSchema },
    ]),
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: 'TransactionRepository',
      useClass: MongooseTransactionRepository,
    },
    {
      provide: 'MemberRepository',
      useClass: MongooseMemberRepository,
    },
    {
      provide: 'BookRepository',
      useClass: MongooseBookRepository,
    },
    DtoToModelTransformer,
  ],
})
export class TransactionModule {}
