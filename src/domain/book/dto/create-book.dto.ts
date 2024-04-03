// book/dto/create-book.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateBookDto {
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
  pages: number;

  @ApiProperty({ description: 'The year the book was published' })
  @IsNotEmpty()
  @IsInt()
  @Min(1000)
  year: number;
}
