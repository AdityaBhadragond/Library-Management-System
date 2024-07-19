import { Controller, Get, Post, Body } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get('top-departments')
  findTopDepartments() {
    return this.departmentsService.getTop5Departments();
  }

  @Get('last-week-winner')
  findLastWeekWinner() {
    return this.departmentsService.getLastWeekWinner();
  }

  @Post('add')
  addDepartment(@Body() body: { name: string, downloadCount: number }) {
    return this.departmentsService.addDepartment(body.name, body.downloadCount);
  }
}
