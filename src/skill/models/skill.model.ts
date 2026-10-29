import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SkillCategoryGql } from '../../common/enums/skill-category.enum';
import { SkillLevelGql } from '../../common/enums/skill-level.enum';

@ObjectType()
export class Skill {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => SkillCategoryGql)
  category!: SkillCategoryGql;

  @Field(() => SkillLevelGql, { nullable: true })
  level?: SkillLevelGql | null;
}
