// Using statements.
const models = require('../models');

// Return the controller methods. 
const MoodController = (flags) => {

    // Assign the models.
    const Models = models(flags);
    const Mood = Models.Mood;

    // Debug message.
    if(flags.DEBUG) { console.log("Preparing Mood controller functions..."); }

    // ACTIONS

    // Create a new mood.
    const createMood = (req, res) => {

        // Creating a mood.
        let content = "Mood value is missing from request.";

        // Need the mood.
        if(!req.body.mood) 
        {            
            if (flags.DEBUG) {
                console.log("Client error. Missing mood value.");
                content = "DEBUG: " + content;
            }
            
            return res.status(400).json({
                api: flags.API_METADATA,
                error: {
                    code: flags.ERRORS.missingMood,
                    name: "Missing Mood data.",
                    message: content
                }
            });
        }

        // Need the user.
        if(!req.body.userID) 
        {
            if (flags.DEBUG) {
                console.log("Client error. Missing user ID.");
                content = "DEBUG: " + content;
            }
            
            return res.status(400).json({
                api: flags.API_METADATA,
                error: {
                    code: flags.ERRORS.missingUser,
                    name: "Missing User ID.",
                    message: content
                }
            });
        }

        // Else, we can create the mood.
        content = "Creating Mood entry.";

        // Construct the data.
        const moodData = {
            mood: req.body.mood,
            owner: req.body.userID
        };

        // Construct instance.
        const newMoodInstance = new Mood.MoodModel(moodData);

        // Persist the mood instance to the database.
        const moodPromise = newMoodInstance.save();

        moodPromise.then(

        ).catch((err) => {
            if(flags.DEBUG) {
                console.log("Client error: " + err);
            }

            if(err.code === 11000) {
                return res.status(400).json({
                    api: flags.API_METADATA,
                    error: {
                        code: flags.ERRORS.moodAlreadyExists,
                        name: "Mood entry already exists.",
                        message: content
                    }
                });

            }



        });

    };

    // Return the controller functions.
    return {
        createMood
    };
};

module.exports = MoodController;