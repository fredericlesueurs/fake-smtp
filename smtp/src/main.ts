import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';
import { promisify } from 'bluebird';
import { FakeEmailService } from './fake-email.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const fakeEmailService = app.get(FakeEmailService);

  const smtp = new SMTPServer({
    disabledCommands: ['STARTTLS', 'AUTH'],
    logger: true,
    onData(stream, session, callback): void {
      (async () => {
        const simpleParserAsync = promisify(simpleParser);
        const parsedEmail = await simpleParserAsync(stream);

        fakeEmailService.publishEmail(parsedEmail);
      })();

      stream.on('end', callback);
    },
  });

  smtp.listen(1025);
}
bootstrap();
