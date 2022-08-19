import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ParsedMail } from 'mailparser';
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

    if (parsedMail.to && Array.isArray(parsedMail.to)) {
      const toRecipients = parsedMail.to
        .map((recipient) => {
          recipient.value.map((recipient) => {
            return Recipient.create(
              recipient.name,
              recipient.address,
              RecipientType.TO,
            );
          });
        })
        .flat();
    }

    const toRecipients = parsedMail.to;

    const from = parsedMail.from.value.pop();
    const sender = Sender.create(from.name, from.address);

    const email = new Email();

    // this.emailRepository.save();
  }
}
