import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => Header, (header) => header.email, {
    cascade: ['insert', 'update', 'remove'],
  })
  headers: Header[];

  @OneToMany(() => Attachment, (attachment) => attachment.email, {
    cascade: ['insert', 'update', 'remove'],
  })
  attachments: Attachment[];

  @OneToMany(() => Recipient, (recipient) => recipient.email, {
    cascade: ['insert', 'update', 'remove'],
  })
  recipients: Recipient[];

  @OneToMany(() => Sender, (sender) => sender.email, {
    cascade: ['insert', 'update', 'remove'],
  })
  senders: Sender[];

  @Column()
  text: string;

  @Column({ nullable: true })
  html?: string | null;

  @Column()
  subject: string;

  @Column('datetime')
  date: Date;

  @Column()
  messageId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  readAt: Date | null;
}
