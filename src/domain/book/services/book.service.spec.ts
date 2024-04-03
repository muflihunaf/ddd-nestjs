import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';

import { CreateBookDto } from '../dto/create-book.dto';

describe('BookService', () => {
  let service: BookService;

  const mockBook = {
    _id: '1',
    title: 'Test Book',
    author: 'Test Author',
    pages: 200,
    year: 2022,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: 'BookRepository',
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockBook]),
            findById: jest.fn().mockResolvedValue(mockBook),
            create: jest.fn().mockResolvedValue(mockBook),
            update: jest.fn().mockResolvedValue(mockBook),
            delete: jest.fn().mockResolvedValue(mockBook),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result = await service.getAllBooks();
      expect(result).toEqual([mockBook]);
    });
  });

  describe('findOne', () => {
    it('should return a book by ID', async () => {
      const result = await service.getBookById('1');
      expect(result).toEqual(mockBook);
    });
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'New Book',
        author: 'New Author',
        pages: 250,
        year: 2023,
      };
      const result = await service.createBook(createBookDto);
      // console.log(result, 'hello');
      console.log(result);
      expect(result).toEqual(mockBook);
    });
  });

  // describe('update', () => {
  //   it('should update an existing book', async () => {
  //     const updateBookDto: Partial<Book> = { title: 'Updated Book' }; // UpdateBookDto menggunakan tipe Partial<Book>
  //     const result = await service.updateBook('1', updateBookDto);
  //     expect(result).toEqual(mockBook);
  //   });
  // });

  describe('remove', () => {
    it('should delete a book by ID', async () => {
      const result = await service.deleteBook('1');
      expect(result).toEqual(mockBook);
    });
  });
});
