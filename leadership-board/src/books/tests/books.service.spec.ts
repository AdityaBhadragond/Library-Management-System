import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../books.service';
import { Book } from '../entities/book.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

describe('BooksService', () => {
  let booksService: BooksService;
  let booksRepository: Repository<Book>;
  let departmentsRepository: Repository<Department>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Department),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    booksRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    departmentsRepository = module.get<Repository<Department>>(getRepositoryToken(Department));
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe('getWeeklyPopularBooks', () => {
    it('should return weekly popular books', async () => {
      // Mock data for books
      const books: Book[] = [
        { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', genre: 'Computer Science', publicationYear: 2009, availability: true, downloadCount: 50, department: null },
        { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', genre: 'Programming', publicationYear: 2008, availability: true, downloadCount: 70, department: null },
        { id: 3, title: 'Design Patterns', author: 'Erich Gamma', isbn: '978-0201633610', genre: 'Software Engineering', publicationYear: 1994, availability: true, downloadCount: 60, department: null },
      ];

      jest.spyOn(booksRepository, 'find').mockResolvedValue(books);

      const weeklyPopularBooks = await booksService.findWeeklyPopular();
      expect(weeklyPopularBooks).toBeDefined();
      expect(weeklyPopularBooks.length).toBeGreaterThan(0);
      expect(weeklyPopularBooks[0].title).toEqual('Clean Code');
    });
  });

  describe('getMonthlyPopularBooks', () => {
    it('should return monthly popular books', async () => {
      // Mock data for books
      const books: Book[] = [
        { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', genre: 'Computer Science', publicationYear: 2009, availability: true, downloadCount: 150, department: null },
        { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', genre: 'Programming', publicationYear: 2008, availability: true, downloadCount: 120, department: null },
        { id: 3, title: 'Design Patterns', author: 'Erich Gamma', isbn: '978-0201633610', genre: 'Software Engineering', publicationYear: 1994, availability: true, downloadCount: 100, department: null },
        { id: 4, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', isbn: '978-0596517748', genre: 'Programming', publicationYear: 2008, availability: true, downloadCount: 90, department: null },
        { id: 5, title: 'Effective Java', author: 'Joshua Bloch', isbn: '978-0134685991', genre: 'Programming', publicationYear: 2018, availability: true, downloadCount: 80, department: null },
      ];

      jest.spyOn(booksRepository, 'find').mockResolvedValue(books);

      const monthlyPopularBooks = await booksService.findMonthlyPopular();
      expect(monthlyPopularBooks).toBeDefined();
      expect(monthlyPopularBooks.length).toBeGreaterThan(0);
      expect(monthlyPopularBooks[0].title).toEqual('Introduction to Algorithms');
    });
  });

  describe('getTodayTrendingBooks', () => {
    it('should return today trending books', async () => {
      // Mock data for books
      const books: Book[] = [
        { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '978-0262033848', genre: 'Computer Science', publicationYear: 2009, availability: true, downloadCount: 50, department: null },
        { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', genre: 'Programming', publicationYear: 2008, availability: true, downloadCount: 45, department: null },
        { id: 3, title: 'Design Patterns', author: 'Erich Gamma', isbn: '978-0201633610', genre: 'Software Engineering', publicationYear: 1994, availability: true, downloadCount: 40, department: null },
        { id: 4, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', isbn: '978-0596517748', genre: 'Programming', publicationYear: 2008, availability: true, downloadCount: 35, department: null },
        { id: 5, title: 'Effective Java', author: 'Joshua Bloch', isbn: '978-0134685991', genre: 'Programming', publicationYear: 2018, availability: true, downloadCount: 30, department: null },
      ];

      jest.spyOn(booksRepository, 'find').mockResolvedValue(books);

      const todayTrendingBooks = await booksService.findTodayTrending();
      expect(todayTrendingBooks).toBeDefined();
      expect(todayTrendingBooks.length).toBeGreaterThan(0);
      expect(todayTrendingBooks[0].title).toEqual('Introduction to Algorithms');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
