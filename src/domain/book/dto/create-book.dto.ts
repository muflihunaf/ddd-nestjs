// book/dto/create-book.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'The title of the book' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The author of the book' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ description: 'The number of pages in the book' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  stock: number;
}
