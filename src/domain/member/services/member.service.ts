// src/domain/services/book.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DtoToModelTransformer } from '../../../infrastructures/transformer/book.transformer';
import { isValidObjectId } from 'mongoose';
import { MemberRepository } from '../repositories/member.repository';
import { Member } from '../model/member.model';
import { UpdateMemberDto } from '../dto/updated-member.dto';
import { CreateMemberDto } from '../dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MemberRepository')
    private readonly memberRepository: MemberRepository,
    private readonly transformer: DtoToModelTransformer,
  ) {}

  async getAllMember(): Promise<Member[]> {
    try {
      const books = await this.memberRepository.findAll();
      return books;
    } catch (error) {
      throw new Error('Failed to fetch all member: ' + error.message);
    }
  }

  async getMemberById(id: string): Promise<Member | null> {
    try {
      if (!isValidObjectId(id)) {
        throw new NotFoundException('Invalid Member ID');
      }
      const book = await this.memberRepository.findById(id);
      if (!book) {
        throw new NotFoundException('Member not found');
      }
      return book;
    } catch (error) {
      throw new NotFoundException(
        'Failed to fetch Member by ID: ' + error.message,
      );
    }
  }

  async createMember(member: CreateMemberDto): Promise<Member> {
    try {
      const memberDto =
        this.transformer.transformCreateMemberDtoToMember(member);
      const newMember = await this.memberRepository.create(memberDto);
      return newMember;
    } catch (error) {
      throw new Error('Failed to create book: ' + error.message);
    }
  }

  async updateMember(
    id: string,
    member: UpdateMemberDto,
  ): Promise<Member | null> {
    try {
      const existingMember = await this.getMemberById(id);

      if (!existingMember) {
        throw new NotFoundException('Member not found');
      }

      // Transformasikan DTO pembaruan menjadi model buku yang baru
      const updatedMember = this.transformer.transformUpdateMemberDtoToMember(
        member,
        existingMember,
      );

      // Perbarui buku dalam penyimpanan data
      const savedMember = await this.memberRepository.update(id, updatedMember);

      return savedMember;
    } catch (error) {
      // Tangani kesalahan yang terjadi selama proses
      // Kembalikan null jika terjadi kesalahan
      throw new NotFoundException(
        'Failed to fetch book by ID: ' + error.message,
      );
    }
  }

  async deleteMember(id: string): Promise<Member | null> {
    return this.memberRepository.delete(id);
  }
}
