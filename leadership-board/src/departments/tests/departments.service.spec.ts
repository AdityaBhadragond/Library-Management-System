import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';
import { DepartmentsService } from '../departments.service';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let departmentRepositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: getRepositoryToken(Department),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    departmentRepositoryMock = module.get(getRepositoryToken(Department));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPopularDepartments', () => {
    it('should return last week winner and top 5 department ranking', async () => {
      
      //call the service method to add department
      service.addDepartment("A",100)
      service.addDepartment("B",90)
      service.addDepartment("C",80)
      service.addDepartment("D",70)
      service.addDepartment("E",60)
      service.addDepartment("F",50)
      service.addDepartment("G",40)

      // Call the service method to get top 5 departments
      const popularDepartments = await service.getTop5Departments();

      // Assertions
      expect(popularDepartments.length).toBe(5);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
