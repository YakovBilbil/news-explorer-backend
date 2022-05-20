import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.mjs";
import { NotFoundError } from "../utils/errorsHandle.mjs";


const createUser = async(req, res) => {
    try {
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
            res.send(newUser);
        }
    } catch (error) {
        handleCatchErrors(error, res);
    }
};


const login = async(req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await User.findUserByCredentials(email, password, name);
        if (!user) {
            throw new AuthError('authentication Error');
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "dev-secret", { expiresIn: "7d" });
        res.json({ token });
    } catch (next) {}
};


const getUserData = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.user._id });
        if (!user) {
            throw new NotFoundError('No user with matching ID found');
        }
        res.send(user);
    } catch (next) {}
};

export { createUser, login, getUserData }