// src/domain/services/book.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DtoToModelTransformer } from '../../../infrastructures/transformer/book.transformer';
import { MemberService } from './member.service';
import { Member } from '../model/member.model';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/updated-member.dto';

describe('MemberService', () => {
  let service: MemberService;
  // let bookRepository: BookRepository;
  const mocMember: Member = {
    code: 'New-123',
    name: 'New Member',
    isPenalized: false,
    penalizeEndDate: new Date('2024-11-10'),
  };

  const mockCreateMemberDto: CreateMemberDto = {
    code: 'New-123',
    name: 'New 123',
  };

  const mockUpdateMemberDto: UpdateMemberDto = {
    code: 'Update-123',
    name: 'Update 123',
  };

  const mockBookRepository = {
    findAll: jest.fn().mockResolvedValue([mocMember]),
    findById: jest.fn().mockResolvedValue(mocMember),
    create: jest.fn().mockResolvedValue(mockCreateMemberDto),
    update: jest.fn().mockResolvedValue(mockUpdateMemberDto),
    delete: jest.fn().mockResolvedValue(mocMember),
  };

  const mockTransformer = {
    transformCreateMemberDtoToMember: jest.fn().mockReturnValue(mocMember),
    transformUpdateMemberDtoToMember: jest.fn().mockReturnValue(mocMember),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        { provide: 'MemberRepository', useValue: mockBookRepository },
        { provide: DtoToModelTransformer, useValue: mockTransformer },
        // DtoToModelTransformer,
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    // bookRepository = module.get<BookRepository>('BookRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllMember', () => {
    it('should return all Member', async () => {
      const result = await service.getAllMember();
      expect(result).toEqual([mocMember]);
    });
  });

  describe('getMemberById', () => {
    it('should return a Member by ID', async () => {
      const result = await service.getMemberById('660cf04ec5512c7d81f1aa13');
      expect(result).toEqual(mocMember);
    });

    it('should throw NotFoundException for invalid ID', async () => {
      expect.assertions(1);
      await expect(service.getMemberById('invalid')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createMember', () => {
    it('should create a new Member', async () => {
      const createMemberDto: CreateMemberDto = {
        name: 'New 123',
        code: 'new-123',
      };

      const newMember: Member = {
        code: 'New-123',
        name: 'New 123',
        isPenalized: false,
        penalizeEndDate: undefined,
      };

      mockTransformer.transformCreateMemberDtoToMember.mockReturnValue(
        newMember,
      );
      mockBookRepository.create.mockResolvedValue(newMember);

      const result = await service.createMember(createMemberDto);

      expect(result).toEqual(newMember);
      expect(
        mockTransformer.transformCreateMemberDtoToMember,
      ).toHaveBeenCalledWith(createMemberDto);
      expect(mockBookRepository.create).toHaveBeenCalledWith(newMember);
    });

    describe('updateMember', () => {
      describe('updateMember', () => {
        it('should update a member', async () => {
          const memberId = '660cf04ec5512c7d81f1aa13';
          const updateMemberDto: UpdateMemberDto = {
            name: 'Update 123', // Sesuaikan dengan nama yang diharapkan
          };

          const existingMember: Member = {
            code: 'existing-code',
            name: 'Existing Member',
            isPenalized: false,
            penalizeEndDate: new Date('2024-03-11'),
          };

          const updatedMember: Member = {
            code: 'Update-123',
            name: 'Update 123',
            isPenalized: false,
            penalizeEndDate: new Date('2024-03-11'),
          };

          mockBookRepository.findById.mockResolvedValue(existingMember);
          mockTransformer.transformUpdateMemberDtoToMember.mockReturnValue(
            updatedMember,
          );
          mockBookRepository.update.mockResolvedValue(updatedMember);

          const result = await service.updateMember(memberId, updateMemberDto);

          expect(result).toEqual(updatedMember);
          expect(mockBookRepository.findById).toHaveBeenCalledWith(memberId);
          expect(
            mockTransformer.transformUpdateMemberDtoToMember,
          ).toHaveBeenCalledWith(updateMemberDto, existingMember);
          expect(mockBookRepository.update).toHaveBeenCalledWith(
            memberId,
            updatedMember,
          );
        });
      });
    });
  });
});
