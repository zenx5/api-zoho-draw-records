import BaseService from "../services/BaseService.js";
import { validateDateToken } from "../tools/token.js"

export const tokenMiddleware = (next) => async ( user, req, res ) => {
    let access_token = user.access_token;
    const { updatedAt, refresh_token } = user
    if( !validateDateToken(updatedAt) ) {
        const response = await BaseService.refreshToken(refresh_token)
        user.access_token = response.access_token
        access_token = response.access_token
        await user.save()
    }

    return next(access_token, req, res)
}