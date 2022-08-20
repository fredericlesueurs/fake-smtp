import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './email.entity';

@Entity()
export class Sender {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Email, (email) => email.senders)
  email: Email;

  @Column()
  name: string;

  @Column()
  address: string;

  static create(name: string, address: string) {
    const sender = new Sender();
    sender.name = name;
    sender.address = address;

    return sender;
  }
}
