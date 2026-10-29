import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Achievement } from './achievement.model';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id!: string;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field({ description: 'Human-readable period from the CV' })
  period!: string;

  @Field(() => String, { nullable: true })
  subtitle?: string | null;

  @Field(() => [Achievement])
  achievements!: Achievement[];
}
