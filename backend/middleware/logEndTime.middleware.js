const logEndTime = (req, res, next) => {
    const endTime = Date.now();
    const executionTime = endTime - req.startTime; // Calculating the execution time

    // Log the execution time
    console.log(`Request to ${req.method} ${req.originalUrl} took ${executionTime} ms`);

    // Include execution time in response header
    res.setHeader('X-Execution-Time', executionTime);

    next();
};

module.exports = { logEndTime };
