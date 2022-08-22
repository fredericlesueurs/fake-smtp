import { Int, Query, Resolver } from '@nestjs/graphql';
import { Email } from '../models/email.model';
import { EmailService } from '../services/email.service';

@Resolver()
export class EmailResolver {
  constructor(
    private emailService: EmailService,
  ) {
  }

  @Query(() => Int)
  async countEmails() {
    return await this.emailService.countAll();
  }
}
