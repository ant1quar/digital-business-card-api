# digital-business-card-api

GraphQL **digital business card** backend for Ivan Krivonos — built for a job-test assignment with NestJS, Prisma, PostgreSQL, and Apollo (code-first).

## Quick start

```bash
docker compose up --build
```

When the stack is healthy:

- **Apollo Sandbox:** http://localhost:3000/graphql  
- **Health:** http://localhost:3000/health  

On startup the app runs `prisma migrate deploy` and an **idempotent seed** (stable UUIDs + upserts) so a fresh database is ready without manual steps.

### Example query (assignment)

```graphql
query {
  profile {
    name
    description
    skills { name }
    experience { company position }
    projects { name }
  }
}
```

### Local development (without Docker)

```bash
cp .env.example .env
# Start PostgreSQL and set DATABASE_URL
npm ci
npx prisma migrate dev
npm run start:dev
```

## Architecture decisions

| Topic | Choice | Why |
|--------|--------|-----|
| **API** | GraphQL code-first (`@nestjs/graphql`) | Matches the assignment; nested `profile → skills/experience/projects` maps naturally to the CV. |
| **Modules** | `profile`, `skill`, `experience`, `project`, `health`, `prisma`, `database` | Domain boundaries: resolvers stay thin, services hold use-cases, repositories wrap Prisma. |
| **Singleton card** | One seeded `Profile` (fixed id) | Real-world “business card” is a single person; `Query.profile` returns that row. Easy to extend later with `slug` if needed. |
| **N+1** | **DataLoader** (request-scoped) | `skills`, `experience`, `projects` load in batched `findMany` per profile id; `achievements` batch by `experienceId`. One query per relation type per request, not per row. |
| **Links** | Computed `links` field on Profile | GitHub, LinkedIn, and `mailto:` from stored columns — no extra table for three fixed links. |
| **Experience period** | `periodLabel` string in DB | CV uses labels like “Jan 2026 – Present”; avoids fuzzy date parsing while staying interview-friendly. |
| **Skills** | Normalized rows + `SkillCategory` / `SkillLevel` enums | Supports filtering/sorting (`sortOrder`) and GraphQL enums without stringly-typed categories. |
| **DB bootstrap** | `DatabaseBootstrapService` on app boot | Satisfies “migrations + seed on start” for Docker/Render; seed function is shared with `prisma db seed`. |
| **Config** | `@nestjs/config` + `class-validator` | Fail fast on missing `DATABASE_URL`; toggles Sandbox via `GRAPHQL_*`. |
| **Sandbox in prod** | `ApolloServerPluginLandingPageLocalDefault` + introspection env flags | Render blueprint enables Sandbox for reviewers; turn off with `GRAPHQL_INTROSPECTION=false` / `GRAPHQL_PLAYGROUND=false`. |

## Project layout

```
src/
  profile/          # Query.profile + field resolvers
  skill/            # Repository (used by DataLoader)
  experience/       # Repository + Achievement field resolver
  project/          # Repository
  common/dataloader # Request-scoped batch loaders
  database/         # Migrations on boot + seed-data
  prisma/           # PrismaService (global)
  health/           # GET /health (Terminus + Prisma ping)
prisma/
  schema.prisma
  migrations/
  seed.ts           # CLI entry → src/database/seed-data.ts
```

## Tests

```bash
# Unit (no DB)
npm test

# E2E (requires PostgreSQL at DATABASE_URL, same as .env.example)
npm run test:e2e
```

## Deploy to Render

1. Push this repo to GitHub.
2. In Render: **New → Blueprint** and select `render.yaml`.
3. Render creates a **managed Postgres** and a **Docker web service** (`healthCheckPath: /health`).
4. Open `https://<service>.onrender.com/graphql` for Apollo Sandbox (introspection enabled in blueprint).

Ensure the web service uses the Dockerfile (defined in `render.yaml`).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run build` | Compile NestJS |
| `npm run start:prod` | Run compiled app |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npx prisma migrate dev` | Local migration authoring |
| `npx prisma db seed` | Run seed manually |

## License

MIT
