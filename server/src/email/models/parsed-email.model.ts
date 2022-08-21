import { Attachment, ParsedMail } from 'mailparser';

export interface CustomAttachment extends Attachment {
  base64Content: string;
}

export interface CustomParserMail extends ParsedMail {
  customAttachment: CustomAttachment[];
}