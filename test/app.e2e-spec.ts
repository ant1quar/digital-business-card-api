import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
const EXAMPLE_QUERY = `
  query {
    profile {
      name
      description
      skills { name }
      experience { company position }
      projects { name }
    }
  }
`;

describe('GraphQL (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('runs the assignment example query', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: EXAMPLE_QUERY })
      .expect(200);

    const body = response.body as {
      errors?: unknown;
      data: {
        profile: {
          name: string;
          description: string;
          skills: { name: string }[];
          experience: { company: string; position: string }[];
          projects: { name: string }[];
        };
      };
    };

    expect(body.errors).toBeUndefined();
    expect(body.data.profile).toMatchObject({
      name: 'Ivan Krivonos',
      description: expect.any(String),
      skills: expect.arrayContaining([{ name: 'TypeScript' }]),
      experience: expect.arrayContaining([
        { company: 'Breez', position: 'Senior Fullstack Developer' },
      ]),
      projects: expect.arrayContaining([
        { name: expect.stringContaining('Digital business card') },
      ]),
    });
  });
});
