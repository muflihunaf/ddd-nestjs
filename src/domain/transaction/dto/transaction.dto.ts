// book/dto/create-book.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'Book Id' })
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @ApiProperty({ description: 'Member Id' })
  @IsNotEmpty()
  @IsString()
  memberId: string;
}
