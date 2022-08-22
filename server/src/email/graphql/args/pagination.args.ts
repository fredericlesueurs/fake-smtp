import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 20 })
  @Min(0)
  @Max(500)
  take: number;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip: number;
}
