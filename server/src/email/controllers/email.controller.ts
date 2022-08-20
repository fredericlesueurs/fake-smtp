import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ParsedMail } from 'mailparser';
import { EmailService } from '../services/email.service';

@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}

  @EventPattern('emails')
  async handleNewEmail(parsedMail: ParsedMail) {
    await this.emailService.createEmail(parsedMail);
  }
}
