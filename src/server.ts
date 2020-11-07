import 'reflect-metadata'

import express from 'express'

import uploadConfig from './config/upload'
import routes from './routes'

import './database'

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.listen(PORT, () => {
  console.log(`🚀️ Server running on port ${PORT}`)
})
