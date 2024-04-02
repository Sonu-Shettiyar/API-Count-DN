const logStartTime = (req, res, next) => {
    req.startTime = Date.now();
    next();
};

module.exports = {logStartTime};