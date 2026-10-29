import { PrismaClient, SkillCategory, SkillLevel } from '@prisma/client';

/** Stable id so re-running seed upserts the same profile graph. */
export const SEED_PROFILE_ID = '00000000-0000-4000-8000-000000000001';

const profilePayload = {
  id: SEED_PROFILE_ID,
  name: 'Ivan Krivonos',
  location: 'Cascais (Lisbon area), Portugal',
  email: 'krivonos.ivann@gmail.com',
  githubUrl: 'https://github.com/ant1quar',
  linkedInUrl: 'https://www.linkedin.com/in/ivan-ai-frontend',
  description: [
    'Senior / Lead Angular Engineer with 13 years in frontend and 8 years with Angular (Lead at Crystal Intelligence since 2018), earlier freelance delivery for international clients. Frontend architecture for large apps: Nx monorepos with enforced library boundaries, NgRx/RxJS state management, component architecture, and performance (blockchain transaction graph kept smooth at 10,000+ nodes after an SVG-to-Canvas migration with Fabric.js, ~60% lower frame time on reference graphs).',
    'AI-assisted development with Cursor and Claude for scaffolding, refactors across large Nx workspaces, unit/e2e test drafts, ADRs and PR descriptions; project rules for AI agents, structured AI workspace, and automated LLM code review in GitLab CI on merge requests with human review in the loop.',
    'Looking for senior/lead frontend or selective fullstack roles, remote. Fintech / RegTech experience from Crystal Intelligence (AML/KYC platform used by law enforcement, regulators and financial institutions).',
  ].join('\n\n'),
};

type SkillSeed = {
  id: string;
  name: string;
  category: SkillCategory;
  level?: SkillLevel;
  sortOrder: number;
};

const skills: SkillSeed[] = [
  // Frontend
  {
    id: 's001',
    name: 'Angular 21',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 1,
  },
  {
    id: 's002',
    name: 'TypeScript',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 2,
  },
  {
    id: 's003',
    name: 'JavaScript (ES6+)',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 3,
  },
  {
    id: 's004',
    name: 'React',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    sortOrder: 4,
  },
  {
    id: 's005',
    name: 'Ionic / mobile',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    sortOrder: 5,
  },
  {
    id: 's006',
    name: 'HTML5',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 6,
  },
  {
    id: 's007',
    name: 'CSS3/SASS/SCSS',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 7,
  },
  {
    id: 's008',
    name: 'RxJS',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 8,
  },
  {
    id: 's009',
    name: 'NgRx (state management)',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 9,
  },
  {
    id: 's010',
    name: 'Nx',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 10,
  },
  {
    id: 's011',
    name: 'Component architecture',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 11,
  },
  {
    id: 's012',
    name: 'Design systems & design tokens',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 12,
  },
  {
    id: 's013',
    name: 'Angular Material',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    sortOrder: 13,
  },
  {
    id: 's014',
    name: 'TailwindCSS',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    sortOrder: 14,
  },
  {
    id: 's015',
    name: 'PrimeNG',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    sortOrder: 15,
  },
  {
    id: 's016',
    name: 'D3.js',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.PROFICIENT,
    sortOrder: 16,
  },
  {
    id: 's017',
    name: 'Accessibility (a11y)',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    sortOrder: 17,
  },
  {
    id: 's018',
    name: 'Responsive UI',
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    sortOrder: 18,
  },
  // Testing & quality
  {
    id: 's101',
    name: 'Playwright',
    category: SkillCategory.TESTING_QUALITY,
    level: SkillLevel.ADVANCED,
    sortOrder: 101,
  },
  {
    id: 's102',
    name: 'Jest',
    category: SkillCategory.TESTING_QUALITY,
    level: SkillLevel.ADVANCED,
    sortOrder: 102,
  },
  {
    id: 's103',
    name: 'Jasmine/Karma',
    category: SkillCategory.TESTING_QUALITY,
    level: SkillLevel.ADVANCED,
    sortOrder: 103,
  },
  {
    id: 's104',
    name: 'Cypress',
    category: SkillCategory.TESTING_QUALITY,
    level: SkillLevel.PROFICIENT,
    sortOrder: 104,
  },
  {
    id: 's105',
    name: 'Static analysis',
    category: SkillCategory.TESTING_QUALITY,
    level: SkillLevel.ADVANCED,
    sortOrder: 105,
  },
  {
    id: 's106',
    name: 'i18n validation',
    category: SkillCategory.TESTING_QUALITY,
    level: SkillLevel.ADVANCED,
    sortOrder: 106,
  },
  // Backend & infrastructure
  {
    id: 's201',
    name: 'NestJS',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.ADVANCED,
    sortOrder: 201,
  },
  {
    id: 's202',
    name: 'Node.js',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.ADVANCED,
    sortOrder: 202,
  },
  {
    id: 's203',
    name: 'BFF',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.ADVANCED,
    sortOrder: 203,
  },
  {
    id: 's204',
    name: 'Keycloak',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.ADVANCED,
    sortOrder: 204,
  },
  {
    id: 's205',
    name: 'OAuth2/OIDC',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.ADVANCED,
    sortOrder: 205,
  },
  {
    id: 's206',
    name: 'RabbitMQ',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.PROFICIENT,
    sortOrder: 206,
  },
  {
    id: 's207',
    name: 'Redis',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.PROFICIENT,
    sortOrder: 207,
  },
  {
    id: 's208',
    name: 'WebSocket',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.ADVANCED,
    sortOrder: 208,
  },
  {
    id: 's209',
    name: 'REST',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.ADVANCED,
    sortOrder: 209,
  },
  {
    id: 's210',
    name: 'GitLab CI',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.ADVANCED,
    sortOrder: 210,
  },
  {
    id: 's211',
    name: 'AWS',
    category: SkillCategory.BACKEND_INFRASTRUCTURE,
    level: SkillLevel.PROFICIENT,
    sortOrder: 211,
  },
  // AI-assisted
  {
    id: 's301',
    name: 'Cursor',
    category: SkillCategory.AI_ASSISTED,
    level: SkillLevel.EXPERT,
    sortOrder: 301,
  },
  {
    id: 's302',
    name: 'Claude',
    category: SkillCategory.AI_ASSISTED,
    level: SkillLevel.EXPERT,
    sortOrder: 302,
  },
  {
    id: 's303',
    name: 'LLM code review in GitLab CI',
    category: SkillCategory.AI_ASSISTED,
    level: SkillLevel.ADVANCED,
    sortOrder: 303,
  },
  {
    id: 's304',
    name: 'Prompt engineering',
    category: SkillCategory.AI_ASSISTED,
    level: SkillLevel.ADVANCED,
    sortOrder: 304,
  },
];

type ExperienceSeed = {
  id: string;
  company: string;
  position: string;
  periodLabel: string;
  subtitle?: string;
  sortOrder: number;
  achievements: { id: string; text: string; sortOrder: number }[];
};

const experiences: ExperienceSeed[] = [
  {
    id: 'e001',
    company: 'Breez',
    position: 'Senior Fullstack Developer',
    periodLabel: 'Jan 2026 – Present',
    subtitle:
      'Contract · Remote · Multi-tenant organization admin center for corporate video conferencing (SSO, organizations, users, roles)',
    sortOrder: 1,
    achievements: [
      {
        id: 'a001',
        text: 'Built the product from scratch, from requirements to production; took ownership of features end-to-end with BA/SA and backend engineers; wrote ADRs on service and API boundaries; code review.',
        sortOrder: 1,
      },
      {
        id: 'a002',
        text: 'Split the system into UI, API and IdP layers; login with mandatory organization selection via Keycloak Organizations and User Federation (AD/LDAP, OAuth2/OIDC, SSO); custom Keycloak themes.',
        sortOrder: 2,
      },
      {
        id: 'a003',
        text: 'Built Angular admin flows and NestJS REST APIs on the Keycloak Admin API; RabbitMQ, Redis and live updates over WebSocket.',
        sortOrder: 3,
      },
      {
        id: 'a004',
        text: 'Built an automated code review pipeline (AI / LLM) in GitLab CI: an LLM reviewer comments on merge requests against team guidelines; authored frontend and worker-service guidelines, review rules and response format (team standards).',
        sortOrder: 4,
      },
    ],
  },
  {
    id: 'e002',
    company: 'Bimeister',
    position: 'Senior Angular Developer',
    periodLabel: 'Sep 2024 – Dec 2025',
    subtitle: 'Remote · Industrial engineering data platform',
    sortOrder: 2,
    achievements: [
      {
        id: 'a101',
        text: 'Built Angular apps in an Nx monorepo; designed NgRx state-management features; contributed to the internal UI kit / design system (Pupakit); code review and developer experience and tooling improvements.',
        sortOrder: 1,
      },
      {
        id: 'a102',
        text: 'Built a TypeScript static analysis tool measuring module cohesion/coupling and dependency reports to target refactoring; introduced pre-commit i18n validation.',
        sortOrder: 2,
      },
      {
        id: 'a103',
        text: 'Reworked the DataSync module with unified RxJS pipelines, cutting code duplication by ~30% vs the previous version and making the pipelines more scalable.',
        sortOrder: 3,
      },
    ],
  },
  {
    id: 'e003',
    company: 'Crystal Intelligence (Netherlands)',
    position: 'Lead Angular Developer',
    periodLabel: 'Feb 2018 – Aug 2024',
    subtitle:
      'Remote · Fintech / RegTech: blockchain investigation and AML/KYC compliance platform used by law enforcement, regulators and financial institutions',
    sortOrder: 3,
    achievements: [
      {
        id: 'a201',
        text: 'Migrated a monolithic frontend to an Nx workspace with ESLint-enforced library boundaries; set technical direction, made technical decisions, and set team standards via Angular/Nx/RxJS guidelines; mentored and onboarded developers.',
        sortOrder: 1,
      },
      {
        id: 'a202',
        text: 'Built the Angular UI kit as Nx libraries with design tokens (~25% faster time-to-UI for typical new screens); component architecture and reusable accessible customer-facing components.',
        sortOrder: 2,
      },
      {
        id: 'a203',
        text: 'Developed a browser extension and a Node.js BFF (~30% faster first useful screen, internal); set up Playwright end-to-end tests in CI; unit tests with Jasmine/Karma and Jest; Cypress for selected flows.',
        sortOrder: 3,
      },
      {
        id: 'a204',
        text: 'Migrated the transaction graph from SVG to Canvas (Fabric.js): ~60% lower frame time on reference graphs, smooth at 10,000+ nodes.',
        sortOrder: 4,
      },
      {
        id: 'a205',
        text: 'Built an internal React interface for a mining pool; shipped Ionic / mobile surfaces alongside the Angular web app (PrimeNG, Angular Material, TailwindCSS, HTML5, CSS3/SASS/SCSS).',
        sortOrder: 5,
      },
    ],
  },
  {
    id: 'e004',
    company: 'Upwork',
    position: 'Freelance Frontend Developer',
    periodLabel: 'Jul 2015 – Jan 2018',
    sortOrder: 4,
    achievements: [
      {
        id: 'a301',
        text: 'Websites and online stores for international clients (WordPress, PHP, jQuery); full delivery cycle, client communication in English.',
        sortOrder: 1,
      },
    ],
  },
  {
    id: 'e005',
    company: 'Eikoncraft',
    position: 'Frontend Developer',
    periodLabel: 'Jul 2012 – Jun 2015',
    sortOrder: 5,
    achievements: [
      {
        id: 'a401',
        text: 'Corporate websites and online stores (WordPress, PHP, jQuery); responsive HTML5/CSS3 layouts.',
        sortOrder: 1,
      },
    ],
  },
];

const projects = [
  {
    id: 'p001',
    name: 'Multi-tenant organization admin center (Breez)',
    description:
      'Corporate video conferencing admin product: SSO, organizations, users, roles; Angular UI, NestJS APIs on Keycloak Admin API.',
    link: null as string | null,
    sortOrder: 1,
  },
  {
    id: 'p002',
    name: 'Automated LLM code review pipeline (GitLab CI)',
    description:
      'LLM reviewer comments on merge requests against team frontend and worker-service guidelines.',
    link: null,
    sortOrder: 2,
  },
  {
    id: 'p003',
    name: 'TypeScript module cohesion/coupling static analysis tool',
    description:
      'Internal tooling at Bimeister for dependency reports and targeted refactoring.',
    link: null,
    sortOrder: 3,
  },
  {
    id: 'p004',
    name: 'Blockchain transaction graph (Canvas / Fabric.js migration)',
    description:
      'Crystal Intelligence AML/KYC platform: SVG to Canvas migration, smooth rendering at 10,000+ nodes.',
    link: null,
    sortOrder: 4,
  },
  {
    id: 'p005',
    name: 'Angular UI kit (Nx libraries with design tokens)',
    description:
      'Reusable accessible component libraries for Crystal Intelligence customer-facing applications.',
    link: null,
    sortOrder: 5,
  },
  {
    id: 'p006',
    name: 'Digital business card GraphQL API',
    description:
      'NestJS + Prisma + Apollo GraphQL backend for a personal digital business card.',
    link: 'https://github.com/ant1quar/digital-business-card-api',
    sortOrder: 6,
  },
];

export async function seedDatabase(client: PrismaClient): Promise<void> {
  await client.profile.upsert({
    where: { id: SEED_PROFILE_ID },
    create: profilePayload,
    update: {
      name: profilePayload.name,
      description: profilePayload.description,
      location: profilePayload.location,
      email: profilePayload.email,
      githubUrl: profilePayload.githubUrl,
      linkedInUrl: profilePayload.linkedInUrl,
    },
  });

  for (const skill of skills) {
    await client.skill.upsert({
      where: { id: skill.id },
      create: { ...skill, profileId: SEED_PROFILE_ID },
      update: {
        name: skill.name,
        category: skill.category,
        level: skill.level,
        sortOrder: skill.sortOrder,
        profileId: SEED_PROFILE_ID,
      },
    });
  }

  for (const exp of experiences) {
    const { achievements, ...expData } = exp;
    await client.experience.upsert({
      where: { id: exp.id },
      create: { ...expData, profileId: SEED_PROFILE_ID },
      update: {
        company: expData.company,
        position: expData.position,
        periodLabel: expData.periodLabel,
        subtitle: expData.subtitle,
        sortOrder: expData.sortOrder,
        profileId: SEED_PROFILE_ID,
      },
    });
    for (const ach of achievements) {
      await client.achievement.upsert({
        where: { id: ach.id },
        create: { ...ach, experienceId: exp.id },
        update: { text: ach.text, sortOrder: ach.sortOrder, experienceId: exp.id },
      });
    }
  }

  for (const project of projects) {
    await client.project.upsert({
      where: { id: project.id },
      create: { ...project, profileId: SEED_PROFILE_ID },
      update: {
        name: project.name,
        description: project.description,
        link: project.link,
        sortOrder: project.sortOrder,
        profileId: SEED_PROFILE_ID,
      },
    });
  }
}
