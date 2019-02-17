// For prod.
const requiresSecure = (req, res, next) => {
    if(req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.hostname}${req.url}`);
    }
    return next();
};

// For dev.
const bypassSecure = (req, res, next) => {
    next();
};

// Export the controller functions.
module.exports = {
    requiresSecure: (process.env.NODE_ENV.trim() === 'dev') ? bypassSecure : requiresSecure
};