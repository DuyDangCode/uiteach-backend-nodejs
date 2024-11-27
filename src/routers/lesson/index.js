import express from 'express'
import { authentication } from '../../auth/checkAuth.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import LessonController from '../../controllers/lesson.controller.js'

const lessonRouter = express.Router()

lessonRouter.get(
  '/all-published/:subjectId',
  asyncHandler(LessonController.getAllPublishedBySubjectId),
)

// courseRouter.use(authentication)
lessonRouter.post('/', asyncHandler(LessonController.create))

export default lessonRouter
