import { normalizeDatabaseUrl } from './database-url';

describe('normalizeDatabaseUrl', () => {
  const originalSsl = process.env.DATABASE_SSL;

  afterEach(() => {
    process.env.DATABASE_SSL = originalSsl;
  });

  it('appends sslmode=require when missing', () => {
    process.env.DATABASE_SSL = 'true';
    expect(normalizeDatabaseUrl('postgresql://u:p@host/db')).toBe(
      'postgresql://u:p@host/db?sslmode=require',
    );
  });

  it('leaves url unchanged when sslmode is set', () => {
    const url = 'postgresql://u:p@host/db?sslmode=verify-full';
    expect(normalizeDatabaseUrl(url)).toBe(url);
  });

  it('skips when DATABASE_SSL=false', () => {
    process.env.DATABASE_SSL = 'false';
    const url = 'postgresql://u:p@host/db';
    expect(normalizeDatabaseUrl(url)).toBe(url);
  });
});
