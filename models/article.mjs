import mongoose from "mongoose";
import validator from "validator";

const cardSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
        validate: [validator.isURL, "invalid URL address!"]
    },
    image: {
        type: String,
        required: true,
        validate: [validator.isURL, "invalid URL address!"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});


export default mongoose.model('article', cardSchema);