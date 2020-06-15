require('dotenv').config();
const express = require('express');
const http = require('http');
const { server, logger } = require('./lib/server');
const mongoose = require('./lib/utils/db');

const { URL, PORT } = process.env;

const app = express();

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
};

const httpServer = http.createServer(app);
server.applyMiddleware({
  app,
  path: URL,
  cors: corsOptions,
});

const graphQLServer = httpServer.listen({ port: PORT }, () => {
  logger.info(`Ruvod graphql http://localhost:${PORT}${server.graphqlPath}`);
  mongoose.connection
    .once('open', () => logger.info('MongoDB is started'))
    .on('error', (err) => logger.error(err));
});

const stop = () =>
  new Promise((resolve) => {
    graphQLServer.close(() => {
      logger.info('Ruvod graphql stop');
      resolve();
    });
  });

// useless export, just need for testing if they upcoming
module.exports = { graphQLServer, stop };
