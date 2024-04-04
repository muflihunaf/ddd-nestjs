// book/dto/create-book.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReturnBookDto {
  @ApiProperty({ description: 'Return Date', example: '2024-04-11' })
  @IsString()
  @IsNotEmpty()
  returnDate: string;

  @ApiProperty({ description: 'Member Id' })
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @ApiProperty({ description: 'Book Id' })
  @IsString()
  @IsNotEmpty()
  bookId: string;
}
