const { ApolloServer, makeExecutableSchema } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const { resolvers } = require('./resolvers');
const logger = require('./utils/logger');

const schema = makeExecutableSchema({
  typeDefs: importSchema('**/*.graphql'),
  resolvers,
  // directiveResolvers,
});

const server = new ApolloServer({
  schema,
  context: (request) => ({
    ...request,
    logger,
  }),
  playground: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
  tracing: process.env.NODE_ENV === 'development',
});

module.exports = {
  schema,
  server,
  logger,
};
