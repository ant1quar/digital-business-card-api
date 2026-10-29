/**
 * Render (and most managed Postgres providers) require TLS. Their connection
 * strings sometimes omit sslmode; Prisma needs an explicit mode for pg.
 */
export function normalizeDatabaseUrl(rawUrl: string | undefined): string | undefined {
  if (!rawUrl) {
    return rawUrl;
  }

  if (process.env.DATABASE_SSL === 'false') {
    return rawUrl;
  }

  if (/[?&]sslmode=/i.test(rawUrl)) {
    return rawUrl;
  }

  const separator = rawUrl.includes('?') ? '&' : '?';
  return `${rawUrl}${separator}sslmode=require`;
}

export function applyDatabaseUrlFromEnv(): void {
  const normalized = normalizeDatabaseUrl(process.env.DATABASE_URL);
  if (normalized && normalized !== process.env.DATABASE_URL) {
    process.env.DATABASE_URL = normalized;
  }
}
