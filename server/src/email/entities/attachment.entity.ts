import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Email } from './email.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Email, (email) => email.attachments, { onDelete: 'CASCADE' })
  email: Email;

  @Column()
  type: string;

  @Column()
  contentType: string;

  @Column()
  contentDisposition: string;

  @Column()
  filename: string;

  @Column()
  checksum: string;

  @Column('int')
  size: number;

  @Column('text')
  content: string;

  static create(
    type: string,
    contentType: string,
    contentDisposition: string,
    filename: string,
    checksum: string,
    size: number,
    content: string,
  ) {
    const attachment = new Attachment();
    attachment.type = type;
    attachment.contentType = contentType;
    attachment.contentDisposition = contentDisposition;
    attachment.filename = filename;
    attachment.checksum = checksum;
    attachment.size = size;
    attachment.content = content;

    return attachment;
  }
}
