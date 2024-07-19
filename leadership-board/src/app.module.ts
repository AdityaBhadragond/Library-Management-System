import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BooksModule } from './books/books.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BooksModule,
    DepartmentsModule,
  ],
})
export class AppModule {}
