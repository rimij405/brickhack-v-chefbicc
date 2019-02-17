// Using statements.
const controllers = require('./controllers');
const middleware = require('./middleware');

// Router to export.
const router = (app, flags) => {
  // Get middleware.
  const mid = middleware(flags);
  const con = controllers(flags);

  if (flags.DEBUG) {
    console.log('Creating routes...');
  }

  // ROOT: Returns a 404 error.
  app.get('/', mid.requiresSecure, con.noRootQuery);

  // ACTIONS:
  // // Login.
  // // Sign up.
  // // Get a user.
  app.get('/getMoods', mid.requiresSecure, con.Mood.getMoods);
  app.post('/createMood', mid.requiresSecure, con.Mood.createMood);
  app.post('/deleteMood', mid.requiresSecure, con.Mood.deleteMood);
  // // Delete a user.
};

// Export the router.
module.exports = router;
