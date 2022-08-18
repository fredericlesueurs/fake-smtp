import { Module } from '@nestjs/common';
import { FakeEmailService } from './fake-email.service';
import {
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'EMAIL_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            host: 'localhost',
            port: 6379,
          },
        });
      },
    },
    FakeEmailService,
  ],
})
export class AppModule {}
