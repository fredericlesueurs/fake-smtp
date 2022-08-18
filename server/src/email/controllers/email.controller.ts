import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ParsedMail } from 'mailparser';

@Controller()
export class EmailController {
  @EventPattern('emails')
  async handleNewEmail(data: ParsedMail) {
    console.log(data);
  }
}
