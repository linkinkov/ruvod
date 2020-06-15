require('dotenv').config();
const mongoose = require('mongoose');

const { MONGO_URL } = process.env;
mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
});

module.exports = mongoose;
