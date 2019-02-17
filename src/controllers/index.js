// Controllers to export.
const controllers = (flags) => {
    
    if(flags.DEBUG){
        console.log("Creating controllers...");
    }

    // Response when root is called.
    const noRootQuery = (req, res) => {
        let content = "No response to root query.";
        if (flags.DEBUG) {
            console.log("API does not allow queries on root endpoint.");
            content = "Debug mode under development.";
        }
        
        return res.status(400).json({
            api: {
                application: "MS",
                version: 1
            },
            error: {
                code: flags.ERRORS.noRootQuery,
                name: "Cannot use root as endpoint for API server.",
                message: content
            }
        });
    };

    // Return the controller functions.
    return {
        noRootQuery
    };
};

// Export the middleware.
module.exports = controllers;