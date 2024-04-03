import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  author: string;

  @ApiProperty()
  @Prop()
  pages: number;

  // Field baru dengan dokumentasi Swagger
  @ApiProperty()
  @Prop()
  year: number;
}

// Deklarasikan BookSchema sebelum penggunaannya
export const BookSchema = SchemaFactory.createForClass(Book);
