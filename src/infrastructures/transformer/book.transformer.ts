import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/domain/book/dto/create-book.dto';
import { UpdateBookDto } from 'src/domain/book/dto/updated-book.dto';
import { Book } from '../../domain/book/model/book.model';
import { CreateMemberDto } from 'src/domain/member/dto/create-member.dto';
import { Member } from 'src/domain/member/model/member.model';
import { UpdateMemberDto } from 'src/domain/member/dto/updated-member.dto';

@Injectable()
export class DtoToModelTransformer {
  // Method untuk melakukan transformasi dari CreateBookDto ke Book
  transformCreateBookDtoToBook(dto: CreateBookDto): Book {
    const { title, author, code, stock } = dto;
    const book = new Book();
    book.title = title;
    book.author = author;
    book.code = code;
    book.stock = stock;
    return book;
  }

  transformUpdateBookDtoToBook(dto: UpdateBookDto, existingBook: Book): Book {
    const { title, author, code, stock } = dto;

    // Update nilai-nilai yang ada di _doc dari existingBook dengan nilai-nilai baru dari DTO
    if (title !== undefined) {
      existingBook.title = title;
    }
    if (author !== undefined) {
      existingBook.author = author;
    }
    if (code !== undefined) {
      existingBook.code = code;
    }
    if (stock !== undefined) {
      existingBook.stock = stock;
    }

    return existingBook;
  }

  transformCreateMemberDtoToMember(dto: CreateMemberDto): Member {
    const { code, name } = dto;
    const member = new Member();
    member.code = code;
    member.name = name;
    return member;
  }

  transformUpdateMemberDtoToMember(
    dto: UpdateMemberDto,
    existingmember: Member,
  ): Member {
    const { code, name } = dto;

    // Update nilai-nilai yang ada di _doc dari existingBook dengan nilai-nilai baru dari DTO
    if (code !== undefined) {
      existingmember.code = code;
    }
    if (name !== undefined) {
      existingmember.name = name;
    }

    return existingmember;
  }
}
