module.exports = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
//ayuda a desbuggear las peticiones que llegan al servidor    