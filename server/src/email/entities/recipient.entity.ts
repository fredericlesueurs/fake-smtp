import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './email.entity';

export enum RecipientType {
  TO = 'TO',
  BCC = 'BCC',
  CC = 'CC',
}

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

  @Column()
  type: string;

  static create(name: string, address: string, type: RecipientType) {
    const recipient = new Recipient();
    recipient.name = name;
    recipient.address = address;
    recipient.type = type.toString();

    return recipient;
  }
}
