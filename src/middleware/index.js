// Middleware to export.
const middleware = (flags) => {
  if (flags.DEBUG) {
    console.log('Creating middleware...');
  }

  // Redirect to HTTPS in production. Ignore this in dev/debug.
  const requiresSecure = (req, res, next) => {
    if (flags.DEBUG) {
      // for dev.
      console.log('Ignore HTTPS redirect in development environment.');
      return next();
    }

    // For prod.
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.get('host')}${req.originalUrl}:${req.port}`);
    }
    return next();
  };

  // Return the middleware functions.
  return {
    requiresSecure,
  };
};

// Export the middleware.
module.exports = middleware;
