import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import configuration from './config/configuration';
import { validateEnv } from './config/env.validation';
import { DatabaseModule } from './database/database.module';
import { ExperienceModule } from './experience/experience.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const introspection = config.get<boolean>('graphql.introspection', true);
        const sandbox = config.get<boolean>('graphql.playground', true);
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          introspection,
          playground: false,
          plugins: sandbox
            ? [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
            : [],
        };
      },
    }),
    PrismaModule,
    DatabaseModule,
    ProfileModule,
    ExperienceModule,
    HealthModule,
  ],
})
export class AppModule {}
