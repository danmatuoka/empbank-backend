import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  title: string;

  @Column({ length: 120 })
  value: string;

  @Column({ length: 120 })
  category: string;

  @Column({ length: 120 })
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.transaction, {
    onDelete: 'CASCADE',
  })
  user: User;
}
