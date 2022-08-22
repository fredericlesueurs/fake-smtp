import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Header } from '../entities/header.entity';
import { Attachment } from '../entities/attachment.entity';
import { Recipient } from '../entities/recipient.entity';
import { Sender } from '../entities/sender.entity';

@ObjectType()
export class Email {
  // headers: Header[];
  //
  // attachments: Attachment[];
  //
  // recipients: Recipient[];
  //
  // senders: Sender[];

  @Field()
  text: string;

  @Field({ nullable: true })
  html?: string | null;

  @Field()
  subject: string;

  @Field(() => GraphQLISODateTime)
  date: Date;

  @Field()
  messageId: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  readAt: Date | null;
}
