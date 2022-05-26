import rateLimit from "express-rate-limit";
import validator from "validator";
import 'dotenv/config';

export const { NODE_ENV, JWT_SECRET } = process.env;

export const mongoServerAddress = "mongodb://localhost:27017/newsexplorer";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
})

export const validateURL = (value, helpers) => {
    if (validator.isURL(value)) {
        return value;
    }
    return helpers.error('string.uri');
}