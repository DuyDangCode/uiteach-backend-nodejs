import { CREATED, OK } from '../core/success.res.js'
import SubjectService from '../services/subject.service.js'

class SubjectController {
  static async create(req, res) {
    return new CREATED({
      message: 'UIT-LEARN::Create subject successful',
      metadata: await SubjectService.create(req.body),
    }).send(res)
  }
  static async getAllPublished(req, res) {
    return new OK({
      message: 'UIT-LEARN::Get all published subject successful',
      metadata: await SubjectService.getAllPublished(req.query),
    }).send(res)
  }
  static async getPublishedByCourseId(req, res) {
    return new OK({
      message: 'UIT-LEARN::Get published subject successful',
      metadata: await SubjectService.getAllPublishedWithCourseId(
        req.params.courseId,
        req.query,
      ),
    }).send(res)
  }
}

export default SubjectController
