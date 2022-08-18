import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ParsedMail } from 'mailparser';

@Injectable()
export class FakeEmailService {
  constructor(@Inject('EMAIL_SERVICE') private readonly client: ClientProxy) {}

  publishEmail(email: ParsedMail): void {
    this.client.emit<number>('emails', email);
  }
}
