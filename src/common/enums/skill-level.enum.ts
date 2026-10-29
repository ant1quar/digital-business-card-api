import { registerEnumType } from '@nestjs/graphql';

export enum SkillLevelGql {
  EXPERT = 'EXPERT',
  ADVANCED = 'ADVANCED',
  PROFICIENT = 'PROFICIENT',
}

registerEnumType(SkillLevelGql, {
  name: 'SkillLevel',
  description: 'Self-assessed proficiency',
});
