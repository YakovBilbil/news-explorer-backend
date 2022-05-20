import express from "express";
import { getArticles, createArticle, deleteArticleById } from "../controllers/articles.mjs";
import { celebrate, Joi } from "celebrate";
import { validateURL } from "../utils/config.mjs";
import JoiObjectId from "joi-objectid";
const myJoiObjectId = JoiObjectId(Joi);

const router = express.Router();

router.get("/", celebrate({
    headers: Joi.object().keys({}).unknown(true)
}), getArticles);

router.post("/", celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
        keyword: Joi.string().required(),
        title: Joi.string().required(),
        text: Joi.string().required(),
        date: Joi.string().required().isoDate(),
        source: Joi.string().required(),
        link: Joi.string().required().custom(validateURL),
        image: Joi.string().required().custom(validateURL),
        owner: myJoiObjectId().required()
    })
}), createArticle);

router.delete("/:articleId", celebrate({
    headers: Joi.object().keys({}).unknown(true),
    body: Joi.object().keys({
        keyword: Joi.string().required(),
        title: Joi.string().required(),
        text: Joi.string().required(),
        date: Joi.string().required().isoDate(),
        source: Joi.string().required(),
        link: Joi.string().required().custom(validateURL),
        image: Joi.string().required().custom(validateURL),
        owner: myJoiObjectId().required()
    })
}), deleteArticleById);


export default router;