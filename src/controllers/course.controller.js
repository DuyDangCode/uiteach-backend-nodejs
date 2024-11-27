import { CREATED, OK } from '../core/success.res.js'
import CourseService from '../services/course.service.js'

class CourseController {
  static async create(req, res) {
    return new CREATED({
      message: 'UIT-LEARN::Create course successful',
      metadata: await CourseService.create(req.body),
    }).send(res)
  }
  static async getAllPublished(req, res) {
    return new OK({
      message: 'UIT-LEARN::Get all published course successful',
      metadata: await CourseService.getAllPublished(req.query),
    }).send(res)
  }
  static async getPublishedByCourseId(req, res) {
    return new OK({
      message: 'UIT-LEARN::Get published course successful',
      metadata: await CourseService.getPublishedByCourseId(req.params.courseId),
    }).send(res)
  }
}

export default CourseController
