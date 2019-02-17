// Using statements.
const controllers = require('./controllers');
const middleware = require('./middleware');

// Router to export.
const router = (app, flags) => {
    
    if(flags.DEBUG){
        console.log("Creating routes...");
    }

    // ROOT: Returns a 404 error.
    app.get('/', middleware.requiresSecure, controllers.noRootQuery);

    // ACTIONS:
    // // Login.
    // // Sign up.
    // // Get a user.
    // // Get a user's moods.
    // // Create mood.
    // // Delete mood.
    // // Delete a user.

};

// Export the router.
module.exports = router;