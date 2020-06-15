const moment = require('moment');
const { createLogger, format, transports } = require('winston');

const { combine, printf, colorize } = format;

const myFormat = printf(
  ({ level, message }) =>
    `${moment().format('DD-MM-YY HH:mm')} (${level}): ${message}`,
);

const logger = createLogger({
  level: 'info',
  format: combine(myFormat, colorize()),
  handleException: true,
  colorize: true,
  json: true,
  maxSize: 5242880,
  maxFiles: 2,
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(myFormat, colorize()),
    }),
  );
}

module.exports = logger;
