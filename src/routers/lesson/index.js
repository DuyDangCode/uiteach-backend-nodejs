import express from 'express'
import { authentication } from '../../auth/checkAuth.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import LessonController from '../../controllers/lesson.controller.js'

const lessonRouter = express.Router()

lessonRouter.use(authentication)
lessonRouter.get(
  '/all-published/:subjectId',
  asyncHandler(LessonController.getAllPublishedBySubjectId),
)

lessonRouter.post('/', asyncHandler(LessonController.create))

export default lessonRouter
