import { Email as GraphQlEmail } from '../models/email.model';
import { Email as EmailEntity } from '../entities/email.entity';

export class EmailMapper {
  entityToGraphQl(
    emails: EmailEntity[] | EmailEntity,
  ): GraphQlEmail[] | GraphQlEmail {
    if (!Array.isArray(emails)) {
      const emailGraphQl = new GraphQlEmail();
      emailGraphQl.createdAt = emails.createdAt;
      emailGraphQl.date = emails.date;
      emailGraphQl.html = emails.html;
      emailGraphQl.messageId = emails.messageId;
      emailGraphQl.readAt = emails.readAt;
      emailGraphQl.subject = emails.subject;
      emailGraphQl.text = emails.text;

      return emailGraphQl;
    }

    return emails.map((email): GraphQlEmail => {
      const emailGraphQl = new GraphQlEmail();
      emailGraphQl.createdAt = email.createdAt;
      emailGraphQl.date = email.date;
      emailGraphQl.html = email.html;
      emailGraphQl.messageId = email.messageId;
      emailGraphQl.readAt = email.readAt;
      emailGraphQl.subject = email.subject;
      emailGraphQl.text = email.text;

      return emailGraphQl;
    });
  }
}
