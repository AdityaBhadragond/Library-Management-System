import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface Department {
  id: number;
  name: string;
  downloadCount: number;
  weeklyWinner?: boolean;
}

@Injectable()
export class DepartmentsService {
  private departments: Department[] = [];
  private departmentIdCounter = 1;

  findAll(): Department[] {
    return this.departments;
  }

  addDepartment(name: string, downloadCount: number): Department {
    const department: Department = {
      id: this.departmentIdCounter++,
      name,
      downloadCount,
    };
    this.departments.push(department);
    return department;
  }

  updateBookDownloadCount(departmentId: number, count: number): Department | undefined {
    const department = this.departments.find(dept => dept.id === departmentId);
    if (department) {
      department.downloadCount = count;
    }
    return department;
  }

  findDepartmentById(departmentId: number): Department | undefined {
    return this.departments.find(department => department.id === departmentId);
  }

  getLastWeekWinner(): Department | undefined {
    const lastWeekWinner = this.departments.find(dept => dept.weeklyWinner);
    return lastWeekWinner;
  }

  getTop5Departments(): Department[] {
    const topDepartments = this.departments.slice();
    topDepartments.sort((a, b) => b.downloadCount - a.downloadCount); // Sort by downloadCount
    return topDepartments.slice(0, 5);
  }  

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleDailyCron() {
    console.log('Updating daily department rankings');
    this.updateDailyDepartmentRankings();
    this.updateLastWeekWinner();
  }

  private updateDailyDepartmentRankings() {
    this.departments.sort((a, b) => b.downloadCount - a.downloadCount);
  }

  private updateLastWeekWinner() {
    const lastWeekWinner = this.getLastWeekWinner();
    if (lastWeekWinner) {
      lastWeekWinner.weeklyWinner = false;
    }

    const currentTop = this.getTop5Departments();
    if (currentTop.length > 0) {
      const topDepartment = currentTop[0];
      topDepartment.weeklyWinner = true;
    }
  }
}
