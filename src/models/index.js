// Using statements.
const User = require('./User.js');
const Mood = require('./Mood.js');

// Prepare the model objects to return.
const models = (flags) => {

    if(flags.DEBUG) {
        console.log("Preparing models...");
    }

    return {
        User,
        Mood
    };
};

module.exports = models;