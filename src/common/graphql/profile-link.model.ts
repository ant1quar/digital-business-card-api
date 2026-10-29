import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileLink {
  @Field()
  label!: string;

  @Field()
  url!: string;
}
