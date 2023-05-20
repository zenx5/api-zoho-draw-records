import Express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import ModulesService from './services/ModulesService.js'
import BaseService from './services/BaseService.js'
import { User } from './database/models/User.js'
import { connection, isReadyConnection } from './database/connection.js'
import { generateUserMockup } from './database/models/Mockup.js'
import { routerSettings } from './router/SettingsRouter.js'

dotenv.config()

const app = Express()

app.use(cors())

app.use('/modules',routerSettings)

app.get('/database/reset', async (req, res)=>{
    await connection.sync({force:true})
    res.json({message: 'database reset'})
})

app.get('/database/generate', async (req, res)=>{
    res.json({message: 'data create', data: await generateUserMockup() })
})

app.get('/generate/:code', async (req, res) => {
    const { code } = req.params
    
    if( await isReadyConnection() ) {
        const { access_token, refresh_token } = await BaseService.getToken(code)
        User.update({
            id:1,
            refresh_token,
            access_token
        })
        res.status(200).send({
            access_token, refresh_token
        })

    } else {
        res.status(500).send("Connection Lost")
    }
})

app.get('/refresh-token', async (req, res) => {
    const user = await User.findOne({ where: { id:1 } })
    const response = await BaseService.refreshToken(user.refresh_token)
    user.access_token = response.access_token
    await user.save()
    res.status(200).send(response)
})


// app.get('/modules', async (req, res) => {
//     const user = await User.findOne({ where: { id:1 } })
//     if( validateToken( user.updatedAt ) ) {
//         console.log('valid')
//         const response = await ModulesService.get(user.access_token)
//         res.status(200).send(response)
//     } else {
//         console.log('not valid')
//         const { access_token } = await BaseService.refreshToken(user.refresh_token)
//         user.access_token = access_token
//         await user.save()
//         const response = await ModulesService.get(access_token)
//         res.status(200).send(response)
//     }
// })

app.listen(3000)