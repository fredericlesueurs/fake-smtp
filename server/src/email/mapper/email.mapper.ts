import {
  AttachmentWithoutFile,
  Email as GraphQlEmail,
  Header,
  Recipient,
  Sender,
} from '../graphql/types/email.type';
import { Email as EmailEntity } from '../entities/email.entity';
import { RecipientType } from '../entities/recipient.entity';
import { RecipientType as RecipientTypeGraphQl } from '../graphql/enums/recipient.enum';

export class EmailMapper {
  entityToGraphQl(
    emails: EmailEntity[] | EmailEntity,
  ): GraphQlEmail[] | GraphQlEmail {
    if (!Array.isArray(emails)) {
      const emailGraphQl = new GraphQlEmail();
      emailGraphQl.id = emails.id;
      emailGraphQl.createdAt = emails.createdAt;
      emailGraphQl.date = emails.date;
      emailGraphQl.html = emails.html;
      emailGraphQl.messageId = emails.messageId;
      emailGraphQl.readAt = emails.readAt;
      emailGraphQl.subject = emails.subject;
      emailGraphQl.text = emails.text;
      emailGraphQl.attachments = emails.attachments.map(
        (attachment): AttachmentWithoutFile => {
          const attachmentWithoutFile = new AttachmentWithoutFile();
          attachmentWithoutFile.id = attachment.id;
          attachmentWithoutFile.checksum = attachment.checksum;
          attachmentWithoutFile.contentType = attachment.contentType;
          attachmentWithoutFile.filename = attachment.filename;
          attachmentWithoutFile.size = attachment.size;
          attachmentWithoutFile.type = attachment.type;

          return attachmentWithoutFile;
        },
      );
      emailGraphQl.headers = emails.headers.map((header): Header => {
        const headerGraphQl = new Header();
        headerGraphQl.key = header.key;
        headerGraphQl.value = header.value;

        return headerGraphQl;
      });
      emailGraphQl.recipients = emails.recipients.map(
        (recipient): Recipient => {
          const recipientGraphQl = new Recipient();
          recipientGraphQl.address = recipient.address;
          recipientGraphQl.name = recipient.name;

          switch (recipient.type) {
            case RecipientType.BCC:
              recipientGraphQl.type = RecipientTypeGraphQl.BCC;
              break;
            case RecipientType.CC:
              recipientGraphQl.type = RecipientTypeGraphQl.CC;
              break;
            default:
              recipientGraphQl.type = RecipientTypeGraphQl.TO;
          }

          return recipientGraphQl;
        },
      );
      emailGraphQl.senders = emails.senders.map((sender): Sender => {
        const senderGraphQl = new Sender();
        senderGraphQl.address = sender.address;
        senderGraphQl.name = sender.name;

        return senderGraphQl;
      });

      return emailGraphQl;
    }

    return emails.map((email): GraphQlEmail => {
      const emailGraphQl = new GraphQlEmail();
      emailGraphQl.id = email.id;
      emailGraphQl.createdAt = email.createdAt;
      emailGraphQl.date = email.date;
      emailGraphQl.html = email.html;
      emailGraphQl.messageId = email.messageId;
      emailGraphQl.readAt = email.readAt;
      emailGraphQl.subject = email.subject;
      emailGraphQl.text = email.text;
      emailGraphQl.attachments = email.attachments.map(
        (attachment): AttachmentWithoutFile => {
          const attachmentWithoutFile = new AttachmentWithoutFile();
          attachmentWithoutFile.id = attachment.id;
          attachmentWithoutFile.checksum = attachment.checksum;
          attachmentWithoutFile.contentType = attachment.contentType;
          attachmentWithoutFile.filename = attachment.filename;
          attachmentWithoutFile.size = attachment.size;
          attachmentWithoutFile.type = attachment.type;

          return attachmentWithoutFile;
        },
      );
      emailGraphQl.headers = email.headers.map((header): Header => {
        const headerGraphQl = new Header();
        headerGraphQl.key = header.key;
        headerGraphQl.value = header.value;

        return headerGraphQl;
      });
      emailGraphQl.recipients = email.recipients.map((recipient): Recipient => {
        const recipientGraphQl = new Recipient();
        recipientGraphQl.address = recipient.address;
        recipientGraphQl.name = recipient.name;

        switch (recipient.type) {
          case RecipientType.BCC:
            recipientGraphQl.type = RecipientTypeGraphQl.BCC;
            break;
          case RecipientType.CC:
            recipientGraphQl.type = RecipientTypeGraphQl.CC;
            break;
          default:
            recipientGraphQl.type = RecipientTypeGraphQl.TO;
        }

        return recipientGraphQl;
      });
      emailGraphQl.senders = email.senders.map((sender): Sender => {
        const senderGraphQl = new Sender();
        senderGraphQl.address = sender.address;
        senderGraphQl.name = sender.name;

        return senderGraphQl;
      });

      return emailGraphQl;
    });
  }
}
