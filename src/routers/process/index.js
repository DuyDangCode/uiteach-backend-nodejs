import express from 'express'
import { authentication } from '../../auth/checkAuth.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import LessonController from '../../controllers/lesson.controller.js'
import ProcessController from '../../controllers/process.controller.js'

const processRouter = express.Router()

processRouter.use(authentication)

processRouter.post('/', asyncHandler(ProcessController.get))
processRouter.post('/create', asyncHandler(ProcessController.create))

processRouter.post(
  '/complete-subject',
  asyncHandler(ProcessController.completeSubject),
)
processRouter.post(
  '/complete-lesson',
  asyncHandler(ProcessController.completeLesson),
)

export default processRouter
