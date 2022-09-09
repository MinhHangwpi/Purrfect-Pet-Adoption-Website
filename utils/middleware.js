const errorLogger = (error, req, res, next) => {
    console.log(error);
    next(error);
}

const errorResponder = (error, req, res, next) => {
    res.header("Content-Type", 'application/json')
    res.status(err.statusCode).send(JSON.stringify(err, null, 4))
}

const invalidPathHandler = (req, res, next) => {
    res.send("The path you requested does not exist");
    res.redirect('/error');
}

module.exports = { errorLogger, errorResponder, invalidPathHandler }

