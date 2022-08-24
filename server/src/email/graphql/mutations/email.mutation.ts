import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { EmailService } from 'src/email/services/email.service';

@Resolver()
export class EmailMutation {
  constructor(private emailService: EmailService) {}

  @Mutation(() => Boolean)
  async deleteEmail(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.emailService.delete(id);

    return true;
  }

  @Mutation(() => Boolean)
  async deleteAll(): Promise<boolean> {
    await this.emailService.deleteAll();

    return true;
  }
}
