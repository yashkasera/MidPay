const { BadRequestError } = require("../utils/error");
const errorHandler = (err, req, res, next) => {
    if (!err.message || !err.statusCode) {
        err = new BadRequestError();
    }
    return res.status(err.statusCode).send({
        code: err.statusCode,
        message: err.message,
    });
};

module.exports = errorHandler;