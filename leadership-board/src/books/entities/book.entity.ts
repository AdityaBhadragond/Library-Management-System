import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from '../../departments/entities/department.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column()
  genre: string;

  @Column()
  publicationYear: number;

  @ManyToOne(() => Department, department => department.books)
  department: Department;

  @Column({ default: true })
  availability: boolean;

  @Column({ default: 0 })
  downloadCount: number;
}
