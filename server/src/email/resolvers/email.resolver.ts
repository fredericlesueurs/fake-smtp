import { Query, Resolver } from '@nestjs/graphql';
import { Email } from '../models/email.model';

@Resolver()
export class EmailResolver {
  @Query(() => [Email])
  emails() {}
}
