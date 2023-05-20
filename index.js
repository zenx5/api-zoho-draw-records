import Express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = Express()

app.get('/', (req, res) => {
    res.status(200).send('Running')
})

app.listen(3000)