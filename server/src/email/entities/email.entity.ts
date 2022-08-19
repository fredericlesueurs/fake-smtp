import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Header } from './header.entity';
import { Attachment } from './attachment.entity';
import { Recipient } from './recipient.entity';
import { Sender } from './sender.entity';

@Entity()
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Header, (header) => header.email)
  headers: Header[];

  @OneToMany(() => Attachment, (attachment) => attachment.email)
  attachments: Attachment[];

  @OneToMany(() => Recipient, (recipient) => recipient.email)
  recipients: Recipient[];

  @OneToOne(() => Sender, (sender) => sender.email)
  sender: Sender;

  @Column()
  text: string;

  @Column()
  html?: string | null;

  @Column()
  subject: string;

  @Column('datetime')
  date: Date;

  @Column()
  messageId: string;
}
