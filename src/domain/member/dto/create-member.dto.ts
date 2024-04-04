// book/dto/create-book.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ description: 'Code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ description: 'Member Name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
