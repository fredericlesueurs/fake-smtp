import { Module } from '@nestjs/common';
import { EmailController } from './controllers/email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { Attachment } from './entities/attachment.entity';
import { Header } from './entities/header.entity';
import { Recipient } from './entities/recipient.entity';
import { Sender } from './entities/sender.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Email, Attachment, Header, Recipient, Sender]),
  ],
  controllers: [EmailController],
})
export class EmailModule {}
