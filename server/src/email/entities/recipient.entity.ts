import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './email.entity';

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Email, (email) => email.recipients)
  email: Email;

  @Column()
  name: string;

  @Column()
  address: string;
}
