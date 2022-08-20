import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AddressObject, ParsedMail } from 'mailparser';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from '../entities/email.entity';
import { Repository } from 'typeorm';
import { Header } from '../entities/header.entity';
import { Attachment } from '../entities/attachment.entity';
import { Sender } from '../entities/sender.entity';
import { Recipient, RecipientType } from '../entities/recipient.entity';

@Controller()
export class EmailController {
  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
  ) {}

  @EventPattern('emails')
  async handleNewEmail(parsedMail: ParsedMail) {
    const headers = parsedMail.headerLines.map((headerLine): Header => {
      return Header.create(headerLine.key, headerLine.line);
    });

    const attachments = parsedMail.attachments.map((attachment): Attachment => {
      return Attachment.create(
        attachment.type,
        attachment.contentType,
        attachment.contentDisposition,
        attachment.filename,
        attachment.checksum,
        attachment.size,
      );
    });

    const recipientsTo = this.extractRecipients(parsedMail.to);
    const recipientsCc = this.extractRecipients(parsedMail.cc);
    const recipientsBcc = this.extractRecipients(parsedMail.bcc);

    const senders = this.extractSenders(parsedMail.from);

    const email = new Email();
    email.senders = senders;
    email.attachments = attachments;
    email.recipients = [...recipientsTo, ...recipientsBcc, ...recipientsCc];
    email.headers = headers;
    email.date = parsedMail.date;
    email.html = parsedMail.html ? parsedMail.html : null;


    // this.emailRepository.save();
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
