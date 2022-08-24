import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailController } from './controllers/email.controller';
import { Email } from './entities/email.entity';
import { Attachment } from './entities/attachment.entity';
import { Header } from './entities/header.entity';
import { Recipient } from './entities/recipient.entity';
import { Sender } from './entities/sender.entity';
import { EmailService } from './services/email.service';
import { EmailResolver } from './graphql/resolvers/email.resolver';
import { EmailMapper } from './mapper/email.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Email, Attachment, Header, Recipient, Sender]),
  ],
  controllers: [EmailController],
  providers: [EmailResolver, EmailService, EmailMapper],
})
export class EmailModule {}
