import express from 'express'
import accessRouter from './access/index.js'
import { BASE_URL_V1 } from '../constant/system.constant.js'
import courseRouter from './course/index.js'
import subjectRouter from './subject/index.js'
import lessonRouter from './lesson/index.js'
import processRouter from './process/index.js'

const routers = express.Router()

routers.use(`${BASE_URL_V1}/users`, accessRouter)
routers.use(`${BASE_URL_V1}/courses`, courseRouter)
routers.use(`${BASE_URL_V1}/subjects`, subjectRouter)
routers.use(`${BASE_URL_V1}/lessons`, lessonRouter)
routers.use(`${BASE_URL_V1}/processes`, processRouter)

export default routers
