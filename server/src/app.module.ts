import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EmailModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'smtp.db',
      autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
