import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { NODE_ENV, JWT_SECRET } from "../utils/config.mjs"
import {
    INVALID_DATA_ERROR,
    handleCatchErrors
} from "../utils/errorsHandle.mjs";
import User from "../models/user.mjs";
import { AlreadyExistError, NotFoundError } from "../utils/errorsHandle.mjs";
import { crossOriginResourcePolicy } from "helmet";


const createUser = async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw new AlreadyExistError;
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            email: req.body.email,
            password: hash,
            name: req.body.name
        });
        if (!newUser) {
            res.status(INVALID_DATA_ERROR).send({
                message: "invalid data passed to the methods for creating a user",
            });
        } else {
            const newUserToSend = newUser.toObject();
            delete newUserToSend.password;
            res.send(newUserToSend);
        }
    } catch (error) {
        handleCatchErrors(error, res);
    }
};


const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findUserByCredentials(email, password);
        if (!user) {
            throw new AuthError("authentication Error");
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "dev-secret", { expiresIn: "7d" });
        res.json({ token });
    } catch (error) {
        handleCatchErrors(error, res);
    }
};


const getUserData = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            throw new NotFoundError("No user with matching ID found");
        }
        res.send(user);
    } catch (next) {}
};

export { createUser, login, getUserData }