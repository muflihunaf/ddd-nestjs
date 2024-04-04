// src/application/controllers/book.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from 'src/domain/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/domain/book/dto/updated-book.dto';
import { CreateMemberDto } from 'src/domain/member/dto/create-member.dto';
import { UpdateMemberDto } from 'src/domain/member/dto/updated-member.dto';
import { Member } from 'src/domain/member/model/member.model';
import { MemberService } from 'src/domain/member/services/member.service';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getAllBooks(): Promise<Member[]> {
    return this.memberService.getAllMember();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Member | null> {
    return this.memberService.getMemberById(id);
  }

  @Post()
  async createBook(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberService.createMember(createMemberDto);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() member: UpdateMemberDto,
  ): Promise<Member | null> {
    return this.memberService.updateMember(id, member);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Member | null> {
    return this.memberService.deleteMember(id);
  }
}
