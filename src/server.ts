import * as express from 'express'
import "reflect-metadata"
import getConnection from './database'
import Routes from './routes/index.routes'

const app = express()

app.use(express.json())

app.use(Routes)

app.listen(5000, async () => {
    await getConnection()
    console.log('Server started on port 5000 🚀')
})
