import express from 'express'
import { authentication } from '../../auth/checkAuth.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import SubjectController from '../../controllers/subject.controller.js'

const subjectRouter = express.Router()

subjectRouter.get(
  '/all-published',
  asyncHandler(SubjectController.getAllPublished),
)
subjectRouter.get(
  '/all-published/:courseId',
  asyncHandler(SubjectController.getPublishedByCourseId),
)

// courseRouter.use(authentication)
subjectRouter.post('/', asyncHandler(SubjectController.create))

export default subjectRouter
