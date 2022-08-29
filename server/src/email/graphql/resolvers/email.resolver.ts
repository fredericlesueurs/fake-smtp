import { Args, Int, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PaginationArgs } from '../args/pagination.args';
import { Email } from '../types/email.type';
import { EmailService } from '../../services/email.service';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class EmailResolver {
  constructor(
    private emailService: EmailService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}
  
  @Query(() => [Email])
  async allEmails(@Args() args: PaginationArgs): Promise<Email[]> {
    return await this.emailService.all(args.take, args.skip);
  }

  @Query(() => Email)
  async email(@Args('id', { type: () => Int }) id: number): Promise<Email> {
    return await this.emailService.getById(id);
  }

  @Subscription(() => Int)
  countEmails() {
    return this.pubSub.asyncIterator('countEmails');
  }
}
