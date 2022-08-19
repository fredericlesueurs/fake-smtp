import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './email.entity';

@Entity()
export class Sender {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Email, (email) => email.sender)
  email: Email;

  @Column()
  name: string;

  @Column()
  address: string;
}
