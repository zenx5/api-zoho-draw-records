import { User } from "../database/models/User.js"

export const authMiddleware = (next) => async ( req, res ) => {

    const { user_id } = req.headers
    if( user_id ) {
        const user = await User.findOne({
            where:{
                id: parseInt(user_id)
            }
        })
        if( user?.id ) {
            return next(user, req, res)
        } else {
            return res.status(403).send("Usuario no existe")
        }

    } else {
        return res.status(403).send("Acceso Denegado")
    }

}