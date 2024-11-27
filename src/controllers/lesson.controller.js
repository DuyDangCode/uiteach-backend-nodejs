import { CREATED, OK } from '../core/success.res.js'
import LessonService from '../services/lesson.service.js'

class LessonController {
  static async create(req, res) {
    return new CREATED({
      message: 'UIT-LEARN::Create lesson successful',
      metadata: await LessonService.create(req.body),
    }).send(res)
  }

  static async getAllPublishedBySubjectId(req, res) {
    return new OK({
      message: 'UIT-LEARN::Get published lesson successful',
      metadata: await LessonService.getAllPublishedLessonBySubjectId(
        req.params.subjectId,
        req.query,
      ),
    }).send(res)
  }
}

export default LessonController
