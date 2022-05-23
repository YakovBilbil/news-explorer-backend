import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

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
    const user = await this.findOne({ email }).select("+password");
    if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
    } else {
        const matched = bcrypt.compare(password, user.password);
        if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
        } else {
            return user;
        }
    }
};

userSchema.statics.findUserByCredentials = findUserByCredentials;


export default mongoose.model('user', userSchema);