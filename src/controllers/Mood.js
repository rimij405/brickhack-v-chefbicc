// Using statements.
const models = require('../models');

// Return the controller methods.
const MoodController = (flags) => {
  // Assign the models.
  const Models = models(flags);
  const Mood = { Models };

  // Debug message.
  if (flags.DEBUG) { console.log('Preparing Mood controller functions...'); }

  // ACTIONS
  let content = 'SERVER ERROR: Unassigned content message.';

  // Create a new mood.
  const createMood = (req, res) => {
    // Creating a mood.
    content = 'Mood value is missing from request.';

    // Need the mood.
    if (!req.body || !req.body.mood) {
      if (flags.DEBUG) {
        console.log('Client error. Missing mood value.');
        content = `DEBUG: ${content} ${req.body}`;
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.mood,
          name: 'Missing Mood data.',
          message: content,
        },
      });
    }

    // Need the user.
    if (!req.body.userID) {
      if (flags.DEBUG) {
        console.log('Client error. Missing user ID.');
        content = `DEBUG: ${content}`;
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.user,
          name: 'Missing User ID.',
          message: content,
        },
      });
    }

    // Else, we can create the mood.
    content = 'Creating Mood entry.';

    // Construct the data.
    const moodData = {
      mood: req.body.mood,
      owner: req.body.userID,
    };

    // Construct instance.
    const newMoodInstance = new Mood.MoodModel(moodData);

    // Persist the mood instance to the database.
    const moodPromise = newMoodInstance.save();

    // Handle saving the mood entry.
    moodPromise.then(
      () => res.status(201).json({ status: 'ok' }),
    );

    // Handle errors.
    moodPromise.catch((err) => {
      content = 'Unknown error occured while creating mood.';

      if (flags.DEBUG) {
        console.log(`Client error: ${err}`);
        content = `DEBUG: ${content}`;
      }

      if (err.code === 11000) {
        content = 'Mood entry already exists.';
        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.alreadyExists.mood,
            name: 'Duplicate Mood.',
            message: content,
          },
        });
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.unknownError,
          name: 'Unknown Error',
          message: content,
        },
      });
    });

    // Return the promise.
    return moodPromise;
  };

  // Delete a mood.
  const deleteMood = (req, res) => {
    // Deleting a mood ID.
    content = 'Mood ID is missing from request.';

    // Need the mood.
    if (!req.body || !req.body._id) {
      if (flags.DEBUG) {
        console.log('Client error. Missing mood ID.');
        content = `DEBUG: ${content}`;
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.moodID,
          name: 'Missing Mood ID.',
          message: content,
        },
      });
    }

    // Call helper method and delete.
    return Mood.MoodModel.findByIdAndDelete(req.body._id, (err) => {
      // Handle error.
      if (err) {
        content = `An error occured while deleting Mood ${req.body._id}.`;
        if (flags.DEBUG) {
          console.log(`Client error: ${err}`);
          content = `DEBUG: ${content}`;
        }
        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.unknownError,
            name: 'Mood Deletion Error.',
            message: content,
          },
        });
      }

      return res.status(204).json({ status: 'ok' });
    });
  };

  const getMoods = (req, res) => {
    // Error check for missing user ID.
    content = 'Cannot query for moods without user ID.';
    
    if (!req.body || !req.body.userID) {
      if (flags.DEBUG) {
        console.log('Client error. Missing user ID.');
        content = `DEBUG: ${content}`;
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.user,
          name: 'Missing User ID.',
          message: content,
        },
      });
    }


    return Mood.MoodModel.findByOwner(req.body.userId, (err, docs) => {
      if (err) {
        content = `Error when querying for moods by owner ${req.body.userId}.`;
        if (flags.DEBUG) {
          console.log(`Client error: ${err}`);
          content = `DEBUG: ${content}`;
        }

        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.unknownError,
            name: 'Mood Query Error.',
            message: content,
          },
        });
      }

      return res.status(200).json({
        api: flags.API_METADATA,
        models: docs,
      });
    });
  };


  // Return the controller functions.
  return {
    createMood,
    deleteMood,
    getMoods,
  };
};

module.exports = MoodController;
