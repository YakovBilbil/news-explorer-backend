import express from "express";
import { getUserData } from "../controllers/users.mjs";
import { celebrate, Joi } from "celebrate";

const router = express.Router();

router.get("/me", celebrate({
        headers: Joi.object().keys({}).unknown(true)
    }),
    getUserData);


export default router;