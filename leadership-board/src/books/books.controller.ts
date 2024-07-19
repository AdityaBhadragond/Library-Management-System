import { Controller, Get, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('weekly-popular')
  findWeeklyPopular() {
    return this.booksService.findWeeklyPopular();
  }

  @Get('monthly-popular')
  findMonthlyPopular() {
    return this.booksService.findMonthlyPopular();
  }

  @Get('today-trending')
  findTodayTrending() {
    return this.booksService.findTodayTrending();
  }

  @Post('add')
  addBook(@Body() body: { title: string, author: string }) {
    return this.booksService.addBook(body.title, body.author);
  }
}
