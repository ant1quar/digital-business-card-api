export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  databaseUrl: process.env.DATABASE_URL,
  graphql: {
    introspection: process.env.GRAPHQL_INTROSPECTION !== 'false',
    playground: process.env.GRAPHQL_PLAYGROUND !== 'false',
  },
});
