const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    lowercase: true,
    required: 'Email address is required',
    match: [
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
});

module.exports = mongoose.model('User', UserSchema);
