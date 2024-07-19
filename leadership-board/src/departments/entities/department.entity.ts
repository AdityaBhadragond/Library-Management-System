import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, book => book.department)
  books: Book[];

  @Column({ default: 0 })
  downloadCount: number;
}
