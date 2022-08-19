import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './email.entity';

@Entity()
export class Header {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Email, (email) => email.headers)
  email: Email;

  @Column()
  key: string;

  @Column()
  value: string;

  static create(key: string, value: string) {
    const header = new Header();
    header.key = key;
    header.value = value;

    return header;
  }
}
