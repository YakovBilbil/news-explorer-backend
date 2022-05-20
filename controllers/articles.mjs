import Article from "../models/article.mjs";
import {
    INVALID_DATA_ERROR,
    NOT_FOUND_ERROR,
    handleCatchErrors,
    AuthRequiredError
} from "../utils/errorsHandle.mjs";

const getArticles = async(req, res) => {
    try {
        const articles = await Article.find({});
        res.send(articles);
    } catch (error) {
        handleCatchErrors(error, res);
    }
};

const createArticle = async(req, res) => {
    try {
        const { name, link } = req.body;
        const newArticle = await Article.create({
            name,
            link,
            owner: req.user._id,
        });
        if (!newArticle) {
            res.status(INVALID_DATA_ERROR).send({
                message: "invalid data passed to the methods for creating an article",
            });
        } else {
            res.send(newArticle);
        }
    } catch (error) {
        handleCatchErrors(error, res);
    }
};

const deleteArticleById = async(req, res) => {
    try {
        const article = await Article.findOne({ _id: req.params.article_id });
        if (!article) {
            res.status(NOT_FOUND_ERROR).send({
                message: "Article ID not found",
            });
        } else {
            if (req.user._id === article.owner.toString()) {
                const articleToDelete = await Article.findOneAndRemove({ _id: req.params.article_id });
                res.send(articleToDelete);
            } else {
                throw new AuthRequiredError("No user with matching ID found");
            }
        }
    } catch (error) {
        handleCatchErrors(error, res);
    }
};


export { getArticles, createArticle, deleteArticleById };