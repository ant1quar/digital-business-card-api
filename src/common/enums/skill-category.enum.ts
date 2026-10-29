import { registerEnumType } from '@nestjs/graphql';

export enum SkillCategoryGql {
  FRONTEND = 'FRONTEND',
  TESTING_QUALITY = 'TESTING_QUALITY',
  BACKEND_INFRASTRUCTURE = 'BACKEND_INFRASTRUCTURE',
  AI_ASSISTED = 'AI_ASSISTED',
}

registerEnumType(SkillCategoryGql, {
  name: 'SkillCategory',
  description: 'Skill grouping from the CV',
});
