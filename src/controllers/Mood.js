// Using statements.
const models = require('../models');

// Return the controller methods.
const MoodController = (flags) => {
  // Assign the models.
  const Models = models(flags);
  const { Mood } = Models;

  // Debug message.
  if (flags.DEBUG) { console.log('Preparing Mood controller functions...'); }

  // ACTIONS

  // Create a new mood.
  const createMood = (req, res) => {
    // Creating a mood.

    // Need the mood.
    if (!req.body || !req.body.mood) {
      if (flags.DEBUG) {
        console.log('Client error. Missing mood value.');
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.mood,
          name: 'Missing Mood data.',
          message: 'Mood value is missing from request.',
        },
      });
    }

    // Need the user.
    if (!req.body.userId) {
      if (flags.DEBUG) {
        console.log('Client error. Missing user ID.');
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.user,
          name: 'Missing User ID.',
          message: 'Cannot create a mood with a missing UserID.',
        },
      });
    }


//    if (req.body

    // Construct the data.
    const moodData = {
      mood: req.body.mood,
      owner: req.body.userId,
    };

    // Triple-if!
    if (req.body.ouncesOfCoffee) {
      moodData.ouncesOfCoffee = req.body.ouncesOfCoffee;
    }
    if (req.body.hoursOfSleep) {
      moodData.hoursOfSleep = req.body.hoursOfSleep;
    }
    if (req.body.hoursOfExercise) {
      moodData.hoursOfExercise = req.body.hoursOfExercise;
    }
    if (req.body.numberOfMeals) {
      moodData.numberOfMeals = req.body.numberOfMeals;
    }

    // Construct instance.
    const newMoodInstance = new Mood.MoodModel(moodData);

    // Persist the mood instance to the database.
    const moodPromise = newMoodInstance.save();

    // Handle saving the mood entry.
    moodPromise.then(
      () => res.status(201).json({ 
        api: flags.API_METADATA,
        status: 'ok',
        mood: Mood.MoodModel.toAPI(newMoodInstance)
       }),
    );

    // Handle errors.
    moodPromise.catch((err) => {
      if (flags.DEBUG) {
        console.log(`Client error: ${err}.`);
      }

      if (err.code === 11000) {
        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.alreadyExists.mood,
            name: 'Duplicate Mood.',
            message: 'Mood entry already exists.',
          },
        });
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.unknownError,
          name: 'Unknown Error',
          message: 'An unknown error occured while attempting to create the mood.',
        },
      });
    });

    // Return the promise.
    return moodPromise;
  };

  // Delete a mood.
  const deleteMood = (req, res) => {
    // Deleting a mood ID.
    // Need the mood.
    if (!req.body || !req.body._id) {
      if (flags.DEBUG) {
        console.log('Client error. Missing mood ID.');
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.moodID,
          name: 'Missing Mood ID.',
          message: 'Cannot delete mood without mood ID.',
        },
      });
    }

    // Call helper method and delete.
    return Mood.MoodModel.findByIdAndDelete(req.body._id, (err) => {
      // Handle error.
      if (err) {
        if (flags.DEBUG) {
          console.log(`Client error: ${err}`);
        }
        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.unknownError,
            name: 'Mood Deletion Error.',
            message: `An error occured while deleting Mood ${req.body._id}.`,
          },
        });
      }

      return res.status(204).json({        
          api: flags.API_METADATA,
          status: 'ok'
        });
    });
  };

  const getMoods = (req, res) => {
    // Error check for missing user ID.
    if (!req.query || !req.query.userId) {
      if (flags.DEBUG) {
        console.log('Client error. Missing user ID.');
      }

      return res.status(400).json({
        api: flags.API_METADATA,
        error: {
          code: flags.ERRORS.missing.user,
          name: 'Missing User ID.',
          message: 'Cannot query for moods without user ID.',
        },
      });
    }


    return Mood.MoodModel.findByOwner(req.query.userId, (err, docs) => {
      if (err || !docs) {
        if (flags.DEBUG) {
          console.log(`Client error: ${err} for ID: ${req.query.userId}`);
        }

        return res.status(400).json({
          api: flags.API_METADATA,
          error: {
            code: flags.ERRORS.unknownError,
            name: 'Mood Query Error.',
            message: `Error when querying for moods by owner ${req.query.userId}.`,
          },
        });
      }

      return res.status(200).json({
        api: flags.API_METADATA,
        moods: docs,
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
