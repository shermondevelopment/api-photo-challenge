import express from 'express'
import cors from 'cors'
import path from 'path'
import setupRoutes from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/album', express.static(path.resolve(__dirname, '..', 'album')))
setupRoutes(app)
export default app
