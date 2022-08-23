import { registerEnumType } from '@nestjs/graphql';

export enum RecipientType {
  TO,
  BCC,
  CC,
}

registerEnumType(RecipientType, { name: 'RecipientType' });
