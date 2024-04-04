import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({
    type: String,
    unique: true,
    default: function genUUID() {
      return uuid();
    },
  })
  _id: string;

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
}

// Deklarasikan BookSchema sebelum penggunaannya
export const BookSchema = SchemaFactory.createForClass(Book);
