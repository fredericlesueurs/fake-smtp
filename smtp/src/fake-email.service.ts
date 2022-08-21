import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CustomParserMail, CustomAttachment } from './email.model';

@Injectable()
export class FakeEmailService {
  constructor(@Inject('EMAIL_SERVICE') private readonly client: ClientProxy) {}

  publishEmail(email: CustomParserMail): void {
    email.customAttachment = email.attachments.map((attachment): CustomAttachment => {
      const convertedAttachment = <CustomAttachment>attachment;
      convertedAttachment.base64Content = attachment.content.toString('base64');

      return convertedAttachment;
    });

    this.client.emit<number>('emails', email);
  }
}
