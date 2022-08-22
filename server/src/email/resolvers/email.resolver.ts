import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../graphql/args/pagination.args';
import { Email } from '../models/email.model';
import { EmailService } from '../services/email.service';

@Resolver()
export class EmailResolver {
  constructor(private emailService: EmailService) {}

  @Query(() => Int)
  async countEmails() {
    return await this.emailService.countAll();
  }

  @Query(() => [Email])
  async allEmails(@Args() args: PaginationArgs): Promise<Email[]> {
    return await this.emailService.all(args.take, args.skip);
  }
}
