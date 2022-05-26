import jwt from "jsonwebtoken";
import { AuthRequiredError } from "../utils/errorsHandle.mjs";
import { NODE_ENV, JWT_SECRET } from "../utils/config.mjs"


export default (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new AuthRequiredError("Authorization required");
    } else {
        const token = authorization.replace('Bearer ', '');
        let payload;
        try {
            payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "dev-secret");
            if (!payload) {
                throw new AuthRequiredError("Authorization required");
            }
        } catch (next) {}
        req.user = payload;
        next();
    }
};