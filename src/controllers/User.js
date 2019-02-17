// Using statements
const models = require('../models');

// I hate this
function getMissingCreateUserContent(flags, body) {
  if (!body.username) return { val: 'username', error: flags.ERRORS.missing.userName };
  if (!body.firstName) return { val: 'firstName', error: flags.ERRORS.missing.firstName };
  if (!body.lastName) return { val: 'lastName', error: flags.ERRORS.missing.lastName };
  if (!body.password) return { val: 'password', error: flags.ERRORS.missing.password };
  if (!body.email) return { val: 'email', error: flags.ERRORS.missing.email };

  return false;
}

// Return controller methods
const UserController = (flags) => {
  const Models = models(flags);
  const { User } = Models;

  // Debug
  if (flags.DEBUG) {
    console.log('Preparing User controller functions...');
  }

  // Create a new user

  // Need username, firstname, lastname, email, pw
  const createUser = (req, res) => {
    const problem = getMissingCreateUserContent(flags, req.body);
    // Handle issues with missing information
    if (problem) {
      if (flags.DEBUG) {
        console.log(`Client error. Missing value: ${problem.val}`);
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: problem.error,
          name: 'Missing user data.',
          message: 'User value missing from request.',
        },
      });
    }

    const userData = {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
    };

    // Construct user instance
    const newUserInstance = new User.UserModel(userData);

    // Create user in the DB
    const userPromise = newUserInstance.save();

    // Handle saving the user entry
    userPromise.then(
      () => res.status(201).json({ status: 'ok' }),
    );

    // Handle errors
    userPromise.catch((err) => {
      if (flags.DEBUG) {
        console.log(`Client error: ${err}.`);
      }

      if (err.code === 11000) {
        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.alreadyExists.user,
            name: 'Duplicate User.',
            message: 'User entry already exists.',
          },
        });
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.unknownError,
          name: 'Unknown Error',
          message: 'An unknown error occured while attempting to create the user.',
        },
      });
    });

    return userPromise;
  };

  // For this request we ONLY need the id- because
  // a user is already logged in when they want
  // to delete themselves
  const deleteUser = (req, res) => {
    // Need the user
    if (!req.body || !req.body._id) {
      if (flags.DEBUG) {
        console.log('Client error. Missing user ID.');
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.userID,
          name: 'Missing User ID.',
          message: 'UserID missing from request.',
        },
      });
    }

    // "mongodb.users.deleteOne(uid)"

    // Call helper method and delete
    return User.findByIdAndDelete(req.body._id, (err) => {
      if (err) {
        if (flags.Debug) {
          console.log(`Client error: ${err}`);
        }
        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.unknownError,
            name: 'User deletion error.',
            message: `An error occured while deleting User ${req.body._id}`,
          },
        });
      }

      return res.status(204).json({ status: 'ok' });
    });
  };

  const getUser = (req, res) => {
    // Error check for missing username.
    if (!req.query || !req.query.username) {
      if (flags.DEBUG) {
        console.log('Client error. Missing username.');
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.username,
          name: 'Missing Username.',
          message: 'Cannot query for users without user name.',
        },
      });
    }

    return User.UserModel.findByUsername(req.query.username, (err, docs) => {
      console.log("Callback");
     
      if (err) {
        if (flags.DEBUG) {
          console.log(`Client error: ${err} for username: ${req.query.username}`);
        }

        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.unknownError,
            name: 'User Query Error.',
            message: `Error when querying for user by username ${req.query.username}.`,
          },
        });
      }

      return res.status(200).json({
        api: flags.API_METADATA,
        models: docs,
      });
    });
  };

  return {
    createUser,
    deleteUser,
    getUser,
  };
};

module.exports = UserController;
