// borrow.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from 'src/domain/book/model/book.model';
import { Member } from 'src/domain/member/model/member.model';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ type: Date, default: Date.now })
  borrowDate: Date;

  @Prop({ type: Date })
  returnDate: Date;

  @Prop({ type: Boolean, default: false })
  isReturned: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Member' })
  member: Member;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Book' })
  book: Book;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
