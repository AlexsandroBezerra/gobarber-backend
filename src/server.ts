import 'reflect-metadata'

import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'

import AppError from './errors/AppError'
import uploadConfig from './config/upload'
import routes from './routes'

import './database'

const app = express()
const PORT = process.env.PORT || 3333

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`🚀️ Server running on port ${PORT}`)
})
