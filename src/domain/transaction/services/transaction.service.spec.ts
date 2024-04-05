import { Test, TestingModule } from '@nestjs/testing';

import { TransactionRepository } from '../repositories/transaction.repository';
import { MemberRepository } from 'src/domain/member/repositories/member.repository';
import { BookRepository } from 'src/domain/book/repositories/book.repository';
import { DtoToModelTransformer } from '../../../infrastructures/transformer/book.transformer';
import { Transaction } from '../model/transaction.model';
import { TransactionService } from './transaction.services';

describe('TransactionService', () => {
  let service: TransactionService;
  let transactionRepositoryMock: Partial<TransactionRepository>;
  let memberRepositoryMock: Partial<MemberRepository>;
  let bookRepositoryMock: Partial<BookRepository>;
  let transformerMock: Partial<DtoToModelTransformer>;

  beforeEach(async () => {
    transactionRepositoryMock = {
      findAll: jest.fn(),
      findByMember: jest.fn(),
      getBorrowedBooksCount: jest.fn(),
      addBorrowedBook: jest.fn(),
      findByFilter: jest.fn(),
      updateTransaction: jest.fn(),
      findBorrowedBookId: jest.fn(),
      findBorrowedBooksCountByMember: jest.fn(),
    };

    memberRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };

    bookRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
    };

    transformerMock = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: 'TransactionRepository',
          useValue: transactionRepositoryMock,
        },
        {
          provide: 'MemberRepository',
          useValue: memberRepositoryMock,
        },
        {
          provide: 'BookRepository',
          useValue: bookRepositoryMock,
        },
        {
          provide: DtoToModelTransformer,
          useValue: transformerMock,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllTransaction', () => {
    it('should return array of transactions', async () => {
      const transactionData = {
        _id: '660eef2e2e023b49c18af4fb',
        borrowDate: new Date('2024-04-04T18:19:26.997Z'),
        returnDate: new Date('2024-04-11T18:19:26.997Z'),
        isReturned: true,
        member: '660ee96ed55947713b645f69',
        book: '660eeefa2e023b49c18af4f5',
        __v: 0,
      };
      const transactions: Transaction[] = [transactionData];

      // Kemudian, Anda dapat menggunakan findAllMock untuk mockResolvedValue
      (transactionRepositoryMock.findAll as jest.Mock).mockResolvedValue(
        transactions,
      );

      const result = await service.getAllTransaction();

      expect(result).toEqual(transactions);
    });

    it('should throw error when fails to fetch all transactions', async () => {
      const error = new Error('Test error');
      (transactionRepositoryMock.findAll as jest.Mock).mockRejectedValue(error);

      await expect(service.getAllTransaction()).rejects.toThrowError(
        'Failed to fetch all books: Test error',
      );
    });
  });
});
