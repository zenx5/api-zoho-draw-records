import Express from "express";
import { getFields, getModules } from "../controller/SettingsController.js";
import { authMiddleware, tokenMiddleware } from "../middleware/index.js";

const settingsRouter = Express.Router()

settingsRouter.get('/modules', authMiddleware(tokenMiddleware(getModules)) )
settingsRouter.get('/fields', authMiddleware(tokenMiddleware(getFields)) )

export {
    settingsRouter
}