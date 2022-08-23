import { Injectable } from '@nestjs/common';
import { AddressObject } from 'mailparser';
import { Header } from '../entities/header.entity';
import { Attachment } from '../entities/attachment.entity';
import { Email } from '../entities/email.entity';
import { Email as GraphQlEmail } from '../graphql/types/email.type';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipient, RecipientType } from '../entities/recipient.entity';
import { Sender } from '../entities/sender.entity';
import { CustomParserMail } from '../models/parsed-email.model';
import { EmailMapper } from '../mapper/email.mapper';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    private emailMapper: EmailMapper,
  ) {}

  async createEmail(parsedMail: CustomParserMail): Promise<void> {
    let recipientsCc = [];
    let recipientsBcc = [];

    const headers = parsedMail.headerLines.map((headerLine): Header => {
      return Header.create(headerLine.key, headerLine.line);
    });

    const attachments = parsedMail.customAttachment.map(
      (attachment): Attachment => {
        return Attachment.create(
          attachment.type,
          attachment.contentType,
          attachment.contentDisposition,
          attachment.filename,
          attachment.checksum,
          attachment.size,
          attachment.base64Content,
        );
      },
    );

    const recipientsTo = this.extractRecipients(parsedMail.to);

    if (parsedMail.cc) {
      recipientsCc = this.extractRecipients(parsedMail.cc);
    }

    if (parsedMail.bcc) {
      recipientsBcc = this.extractRecipients(parsedMail.bcc);
    }

    const senders = this.extractSenders(parsedMail.from);

    const email = new Email();
    email.senders = senders;
    email.attachments = attachments;
    email.recipients = [...recipientsTo, ...recipientsBcc, ...recipientsCc];
    email.headers = headers;
    email.date = parsedMail.date;
    email.html = parsedMail.html ? parsedMail.html : null;
    email.text = parsedMail.text;
    email.messageId = parsedMail.messageId;
    email.subject = parsedMail.subject;

    await this.emailRepository.save(email);
  }

  async countAll(): Promise<number> {
    return await this.emailRepository.count();
  }

  async all(limit?: number, offset?: number): Promise<GraphQlEmail[]> {
    const emails = await this.emailRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.headers', 'h')
      .leftJoinAndSelect('e.attachments', 'a')
      .leftJoinAndSelect('e.recipients', 'r')
      .leftJoinAndSelect('e.senders', 's')
      .limit(limit)
      .offset(offset)
      .getMany();

    return <GraphQlEmail[]>this.emailMapper.entityToGraphQl(emails);
  }

  private extractRecipients(
    parsedMailRecipients: AddressObject | AddressObject[],
  ): Recipient[] {
    if (Array.isArray(parsedMailRecipients)) {
      return parsedMailRecipients
        .map((recipient) => {
          return recipient.value.map((recipient) => {
            return Recipient.create(
              recipient.name,
              recipient.address,
              RecipientType.TO,
            );
          });
        })
        .flat();
    }

    return parsedMailRecipients.value.map((recipient) => {
      return Recipient.create(
        recipient.name,
        recipient.address,
        RecipientType.TO,
      );
    });
  }

  private extractSenders(parsedMailSender: AddressObject): Sender[] {
    return parsedMailSender.value.map((sender) => {
      return Sender.create(sender.name, sender.address);
    });
  }
}
