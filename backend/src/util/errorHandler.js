class NotFoundError extends Error {
    constructor(message) {
        super()
        this.statusCode = 404
        this.message = message ? message : 'Not Found'
    }
}

class AuthenticationError extends Error {
    constructor() {
        super()
        this.statusCode = 401
        this.message = 'Not Authenticated'
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super()
        this.statusCode = 400
        this.message = message ? message : 'Bad Request'
    }
}

class SchemaValidationError extends Error {
    constructor(message) {
        super()
        this.statusCode = 400
        this.message = message ? message : 'Bad Request'
    }
}

class StoreNotVerifiedError extends Error{
    constructor(message) {
        super();
        this.statusCode = 401
        this.message = message ? message : 'Store not verified!'
    }
}


module.exports = {
    NotFoundError,
    AuthenticationError,
    BadRequestError,
    SchemaValidationError,
    StoreNotVerifiedError,
}