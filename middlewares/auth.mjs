import jwt from "jsonwebtoken";
import { AuthRequiredError } from "../utils/errorsHandle.mjs";

export default (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new AuthRequiredError("Authorization required");
    } else {
        const token = authorization.replace('Bearer ', '');
        let payload;
        try {
            payload = jwt.verify(token, 'some-secret-key');
            if (!payload) {
                throw new AuthRequiredError("Authorization required");
            }
        } catch (next) {}
        req.user = payload;
        next();
    }
};