// src/domain/services/book.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Book } from '../model/book.model';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/updated-book.dto';
import { NotFoundException } from '@nestjs/common';
import { DtoToModelTransformer } from '../../../infrastructures/transformer/book.transformer';

describe('BookService', () => {
  let service: BookService;
  // let bookRepository: BookRepository;
  const mockBook: Book = {
    _id: '660cf04ec5512c7d81f1aa13',
    title: 'Test Book',
    author: 'Test Author',
    pages: 200,
    year: 2022,
  };

  const mockCreateBookDto: CreateBookDto = {
    title: 'Test Book',
    author: 'Test Author',
    pages: 200,
    year: 2022,
  };

  const mockUpdateBookDto: UpdateBookDto = {
    title: 'Updated Test Book',
    author: 'Updated Test Author',
    pages: 250,
    year: 2023,
  };

  const mockBookRepository = {
    findAll: jest.fn().mockResolvedValue([mockBook]),
    findById: jest.fn().mockResolvedValue(mockBook),
    create: jest.fn().mockResolvedValue(mockBook),
    update: jest.fn().mockResolvedValue(mockBook),
    delete: jest.fn().mockResolvedValue(mockBook),
  };

  const mockTransformer = {
    transformCreateBookDtoToBook: jest.fn().mockReturnValue(mockBook),
    transformUpdateBookDtoToBook: jest.fn().mockReturnValue(mockBook),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: 'BookRepository', useValue: mockBookRepository },
        { provide: DtoToModelTransformer, useValue: mockTransformer },
        // DtoToModelTransformer,
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    // bookRepository = module.get<BookRepository>('BookRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const result = await service.getAllBooks();
      expect(result).toEqual([mockBook]);
    });
  });

  describe('getBookById', () => {
    it('should return a book by ID', async () => {
      const result = await service.getBookById('660cf04ec5512c7d81f1aa13');
      expect(result).toEqual(mockBook);
    });

    it('should throw NotFoundException for invalid ID', async () => {
      expect.assertions(1);
      await expect(service.getBookById('invalid')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const result = await service.createBook(mockCreateBookDto);
      expect(result).toEqual(mockBook);
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const result = await service.updateBook('660cf04ec5512c7d81f1aa13', mockUpdateBookDto);
      expect(result).toEqual(mockBook);
    });

    it('should throw NotFoundException for non-existent book', async () => {
      expect.assertions(1);
      jest.spyOn(service, 'getBookById').mockResolvedValueOnce(null);
      await expect(
        service.updateBook('invalid', mockUpdateBookDto),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const result = await service.deleteBook('1');
      expect(result).toEqual(mockBook);
    });
  });
});
