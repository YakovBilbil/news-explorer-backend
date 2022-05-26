import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { AuthError, handleCatchErrors } from "../utils/errorsHandle.mjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "invalid Email address!"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 30
    }
});


const findUserByCredentials = async function(email, password) {
    try {
        const user = await this.findOne({ email }).select("+password");
        if (!user) {
            return Promise.reject(new AuthError);
        } else {
            const matched = await bcrypt.compare(password, user.password);
            if (!matched) {
                return Promise.reject(new AuthError);
            } else {
                return user;
            }
        }
    } catch (error) {
        handleCatchErrors(error);
    }
};

userSchema.statics.findUserByCredentials = findUserByCredentials;


export default mongoose.model('user', userSchema);