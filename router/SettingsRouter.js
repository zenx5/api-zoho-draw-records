import Express from "express";
import { getModules } from "../controller/SettingsController.js";
import { authMiddleware, tokenMiddleware } from "../middleware/index.js";

const routerSettings = Express.Router()

routerSettings.get('/all', authMiddleware(tokenMiddleware(getModules)) )

export {
    routerSettings
}