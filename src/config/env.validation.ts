import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @IsOptional()
  @IsString()
  NODE_ENV?: string = 'development';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT?: number = 3000;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;

  @IsOptional()
  @IsBoolean()
  GRAPHQL_INTROSPECTION?: boolean = true;

  @IsOptional()
  @IsBoolean()
  GRAPHQL_PLAYGROUND?: boolean = true;
}

export function validateEnv(config: Record<string, unknown>): EnvironmentVariables {
  const parsed = plainToInstance(EnvironmentVariables, {
    ...config,
    PORT: config.PORT !== undefined ? Number(config.PORT) : 3000,
    GRAPHQL_INTROSPECTION:
      config.GRAPHQL_INTROSPECTION === 'true' || config.GRAPHQL_INTROSPECTION === true,
    GRAPHQL_PLAYGROUND:
      config.GRAPHQL_PLAYGROUND === 'true' || config.GRAPHQL_PLAYGROUND === true,
  });

  const errors = validateSync(parsed, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.toString()}`);
  }
  return parsed;
}
