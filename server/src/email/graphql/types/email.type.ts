import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { RecipientType } from '../enums/recipient.enum';

@ObjectType()
export class Email {
  @Field(() => [Header])
  headers: Header[];

  @Field(() => [AttachmentWithoutFile])
  attachments: AttachmentWithoutFile[];

  @Field(() => [Recipient])
  recipients: Recipient[];

  @Field(() => [Sender])
  senders: Sender[];

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

@ObjectType()
export class Header {
  @Field()
  key: string;

  @Field()
  value: string;
}

@ObjectType()
export class AttachmentWithoutFile {
  @Field(() => Int)
  id: number;

  @Field()
  type: string;

  @Field()
  contentType: string;

  @Field()
  filename: string;

  @Field()
  checksum: string;

  @Field()
  size: number;
}

@ObjectType()
export class Recipient {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field(() => RecipientType)
  type: RecipientType;
}

@ObjectType()
export class Sender {
  @Field()
  name: string;

  @Field()
  address: string;
}
