import rateLimit from "express-rate-limit";
import validator from "validator";

const mongoServerAddress = "mongodb://localhost:27017/aroundb";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
}

export { mongoServerAddress, limiter, validateURL };