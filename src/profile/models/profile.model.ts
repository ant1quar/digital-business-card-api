import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Experience } from '../../experience/models/experience.model';
import { Project } from '../../project/models/project.model';
import { Skill } from '../../skill/models/skill.model';
import { ProfileLink } from '../../common/graphql/profile-link.model';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  location!: string;

  @Field()
  email!: string;

  @Field(() => [ProfileLink])
  links!: ProfileLink[];

  @Field(() => [Skill])
  skills!: Skill[];

  @Field(() => [Experience], { name: 'experience' })
  experience!: Experience[];

  @Field(() => [Project])
  projects!: Project[];
}
