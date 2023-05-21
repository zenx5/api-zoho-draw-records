import Express from "express";
import { getFields, getModules } from "../controller/SettingsController.js";
import { authMiddleware, tokenMiddleware } from "../middleware/index.js";

const routerSettings = Express.Router()

routerSettings.get('/modules', authMiddleware(tokenMiddleware(getModules)) )
routerSettings.get('/fields', authMiddleware(tokenMiddleware(getFields)) )

export {
    routerSettings
}