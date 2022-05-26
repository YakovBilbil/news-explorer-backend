import express from "express";
import usersRouter from "./users.mjs";
import articlesRouter from "./articles.mjs";
import auth from "../middlewares/auth.mjs";
import { createUser, login } from "../controllers/users.mjs";
import { NotFoundError } from "../utils/errorsHandle.mjs";
import { celebrate, Joi } from "celebrate";

const router = express.Router();

router.post("/signup", celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30)
    }),
}), createUser);

router.post("/signin", celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }),
}), login);

router.use(auth);

router.use("/users", usersRouter);

router.use("/articles", articlesRouter);

router.use(() => {
    throw new NotFoundError("Requested resource not found");
});

export default router;