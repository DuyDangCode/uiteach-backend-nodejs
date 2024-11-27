import express from 'express'
import './dbs/init.db.js'
import { checkOverload, countConnet } from './helpers/check.connect.js'
import routers from './routers/index.js'
import Database from './dbs/init.db.js'
import compression from 'compression'
import helmet from 'helmet'
import morgan from 'morgan'
import { checkApiKey, checkPermission } from './auth/checkAuth.js'
import { PERMISSIONS } from './constant/apiKey.constant.js'
import { asyncHandler } from './helpers/index.helper.js'
import cors from 'cors'
import { BASE_URL_V1 } from './constant/system.constant.js'
import { v4 as uuidv4 } from 'uuid'
import logger from './core/logger.js'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import rateLimitingConfig from './configs/rateLimiting.config.js'
import { createApiKey } from './services/apiKey.service.js'

const database = Database.getInstance()
database.connect('mongodb')

const app = express()

const limiter = rateLimit({
  ...rateLimitingConfig,
})

// middleware

app.use((req, res, next) => {
  req.requestId = req.headers['requestId'] || uuidv4()
  logger.logInfo('input params', {
    context: req.path,
    requestId: req.requestId,
    data: req.method === 'post' ? req.body : req.query,
  })
  next()
})

createApiKey()
countConnet()
checkOverload()

app.use(cors())
app.use(limiter)
app.use(morgan('dev'))
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(mongoSanitize())
app.use(hpp())
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(checkApiKey)
app.get(`${BASE_URL_V1}/checkHealth`, (req, res) => {
  res.send({ message: 'UIT-LEARN is running' })
})

// app.use(checkPermission(PERMISSIONS.all))

//define route
app.use('/', routers)

//handle error
//404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  logger.logErr(error.message, { context: req.path, requestId: req.requestId })
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal server error',
  })
})

export default app
