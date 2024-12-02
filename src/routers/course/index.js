import express from 'express'
import { authentication } from '../../auth/checkAuth.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import CourseController from '../../controllers/course.controller.js'

const courseRouter = express.Router()

courseRouter.use(authentication)
courseRouter.get(
  '/all-published',
  asyncHandler(CourseController.getAllPublished),
)
courseRouter.get(
  '/published/:courseId',
  asyncHandler(CourseController.getPublishedByCourseId),
)

courseRouter.post('/', asyncHandler(CourseController.create))

export default courseRouter
