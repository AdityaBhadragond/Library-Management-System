import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface Book {
  id: number;
  title: string;
  author: string;
  downloadCount: number;
  createdAt: Date;
}

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private bookIdCounter = 1;

  findAll(): Book[] {
    return this.books;
  }

  addBook(title: string, author: string): Book {
    const book: Book = {
      id: this.bookIdCounter++,
      title,
      author,
      downloadCount: 0,
      createdAt: new Date(),
    };
    this.books.push(book);
    return book;
  }

  updateDownloadCount(bookId: number, count: number): Book | undefined {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      book.downloadCount = count;
    }
    return book;
  }

  findWeeklyPopular(): Book[] {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return this.getPopularBooksByDate(oneWeekAgo);
  }

  findMonthlyPopular(): Book[] {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return this.getPopularBooksByDate(oneMonthAgo);
  }

  findTodayTrending(): Book[] {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return this.getPopularBooksByDate(oneHourAgo);
  }

  @Cron(CronExpression.EVERY_HOUR)
  handleHourlyCron() {
    console.log('Updating hourly trending books');
    this.removeLeastPopularBooks();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleDailyCron() {
    console.log('Updating daily popular books');
    // Implement logic to update daily popular books
  }

  @Cron(CronExpression.EVERY_WEEK)
  handleWeeklyCron() {
    console.log('Updating weekly popular books');
    // Implement logic to update weekly popular books
  }

  @Cron('0 0 1 * *') // Runs at midnight on the first day of every month
  handleMonthlyCron() {
    console.log('Updating monthly popular books');
    // Implement logic to update monthly popular books
  }

  private getPopularBooksByDate(date: Date): Book[] {
    return this.books
      .filter(book => book.createdAt >= date)
      .sort((a, b) => b.downloadCount - a.downloadCount)
      .slice(0, 5);
  }

  private removeLeastPopularBooks() {
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    this.books = this.books.filter(book => !(book.downloadCount === 0 && book.createdAt <= twoWeeksAgo));
  }
}
