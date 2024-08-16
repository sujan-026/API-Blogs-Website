const loggerMiddleWare = (req, res, next) => {
    console.log(`Method: ${req.method}`);
    console.log(`API hit: ${req.protocol}://${req.get('host')}${req.url}`);
    next();
};

export default loggerMiddleWare;