/*
    User.js
    Mongoose model for a User.
*/

// Require statements.
const crypto = require('crypto');
const mongoose = require('mongoose');

// Set promise.
mongoose.Promise = global.Promise;
const convertId = mongoose.Types.ObjectId;

// Create the user model.
let UserModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

// Create the model schema.
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  moods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mood',
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Helper methods.

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

// Static methods.

UserSchema.statics.toAPI = doc => ({
  // _id is built into your mongo document and is guaranteed to be unique.
  username: doc.username,
  _id: doc._id,
});

UserSchema.statics.findById = (userId, callback) => {
  const search = {
    _id: convertId(userId),
  };

  const projection = {
    _id: 1,
    username: 1,
    email: 1,
    moods: 1,
    firstName: 0,
    lastName: 0,
    salt: 0,
    password: 0,
    createdDate: 0
  };

  return UserModel.findOne(search).select(projection).exec(callback);
};

UserSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return UserModel.findOne(search, callback);
};

UserSchema.statics.findByIdAndDelete = (userId, callback) => {
  const search = {
    _id: convertId(userId),
  };

  return UserModel.deleteOne(search).exec(callback);
};

UserSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => callback(salt, hash.toString('hex')));
};

UserSchema.statics.authenticate = (
  username,
  password,
  callback,
) => UserModel.findByUsername(
  username,
  (err, doc) => {
    if (err) {
      return callback(err);
    }

    if (!doc) {
      return callback();
    }

    return validatePassword(doc, password, (result) => {
      if (result === true) {
        return callback(null, doc);
      }

      return callback();
    });
  },
);

// Create the model.
UserModel = mongoose.model('User', UserSchema);

// Export the model.
module.exports.UserModel = UserModel;
module.exports.UserSchema = UserSchema;
