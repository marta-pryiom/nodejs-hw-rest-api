import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { HttpCode, LIMIT_JSON } from './lib/constants'
import { NotFound } from './lib/messages'

import authRouter from './routes/api/auth'
import contactsRouter from './routes/api/contacts'
import usersRouter from './routes/api/users'
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(helmet())
app.use(logger(formatsLogger))
app.use(express.static(process.env.FOLDER_FOR_AVATARS))
app.use(cors())
app.use(express.json({ limit: LIMIT_JSON })) // json
app.use((req, res, next) => {
  app.set('lang', req.acceptsLanguages(['en', 'ua']))
  next()
})
// app.use(express.urlencoded({ extended: false })) // forms

app.use('/api/contacts', contactsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(HttpCode.Not_Found).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: NotFound,
  })
})
app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  })
})

export default app
