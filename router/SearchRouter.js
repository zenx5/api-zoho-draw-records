import Express from "express";
import { getTotal } from "../controller/SearchController.js";
import { authMiddleware, tokenMiddleware } from "../middleware/index.js";

const searchRouter = Express.Router()

searchRouter.get('/total', authMiddleware(tokenMiddleware(getTotal)) )

export {
    searchRouter
}