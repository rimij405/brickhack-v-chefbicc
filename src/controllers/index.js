// Response when root is called.
const noRootQuery = (req, res) => {
    let content = "No response to root query.";
    if (process.env.NODE_ENV.trim() === 'dev') {
        content = "Debug mode under development.";
    }
    
    return res.status(400).json({
        error: {
            code: "",
            name: "Cannot use root as endpoint for API server.",
            message: content
        }
    });
};

// Export the controller functions.
module.exports = {
    noRootQuery,
};