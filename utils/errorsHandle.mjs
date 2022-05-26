export const INVALID_DATA_ERROR = 400;
export const AUTH_ERROR = 401;
export const AUTHORIZATION_REQUIRED_ERROR = 403;
export const NOT_FOUND_ERROR = 404;
export const ALREADY_EXIST_ERROR = 409;
export const DEFAULT_ERROR = 500;

export class InvalidDataError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = INVALID_DATA_ERROR;
    }
}

export class AuthError extends Error {
    constructor(message) {
        super(message);
        this.message = "Incorrect email or password";
        this.statusCode = AUTH_ERROR;
    }
}

export class AuthRequiredError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = AUTHORIZATION_REQUIRED_ERROR;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = NOT_FOUND_ERROR;
    }
}

export class AlreadyExistError extends Error {
    constructor(message) {
        super(message);
        this.message = "This Email already exists";
        this.statusCode = ALREADY_EXIST_ERROR;
    }
}

export class DefaultError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = DEFAULT_ERROR;
    }
}

export const handleCatchErrors = (error, res) => {
    if (error.name === "Error") {
        res.status(error.statusCode).send({ message: `${error.message}` });
    } else if ((error.name === "CastError") || (error.name === "ValidationError")) {
        res.status(INVALID_DATA_ERROR).send({
            message: `${error.name}. Invalid Data`,
        });
    } else {
        res.status(DEFAULT_ERROR).send({
            message: `${error.name}. Something went wrong`,
        });
    }
};