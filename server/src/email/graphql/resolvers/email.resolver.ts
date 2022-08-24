import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { PaginationArgs } from '../args/pagination.args';
import { Email } from '../types/email.type';
import { EmailService } from '../../services/email.service';

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

  @Query(() => Email)
  async email(@Args('id', { type: () => Int }) id: number): Promise<Email> {
    return await this.emailService.getById(id);
  }

  @Query(() => Boolean)
  async deleteEmail(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.emailService.delete(id);

    return true;
  }
}
