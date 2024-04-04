import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @ApiProperty()
  @Prop()
  code: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  author: string;

  @ApiProperty()
  @Prop()
  stock: number;

  @Prop({ default: true })
  isAvailable: number;
}

// Deklarasikan BookSchema sebelum penggunaannya
export const BookSchema = SchemaFactory.createForClass(Book);
