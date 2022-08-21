import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ParsedMail } from 'mailparser';
import { EmailService } from '../services/email.service';
import { CustomParserMail } from '../models/parsed-email.model';

@Controller()
export class EmailController {
  constructor(private emailService: EmailService) {}

  // @Get('emails')
  // async allMails() {
  //   return await this.emailService.getAllMails();
  // }

  @EventPattern('emails')
  async handleNewEmail(parsedMail: ParsedMail) {
    await this.emailService.createEmail(<CustomParserMail>parsedMail);
  }
}
