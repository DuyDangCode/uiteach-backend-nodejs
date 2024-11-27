import { BadRequestError } from '../core/error.res.js'
import {
  createLesson,
  findAllPublishedLessonBySubjectId,
} from '../models/repositories/lesson.repo.js'
import { findPublishedSubjectBySubjectId } from '../models/repositories/subject.repo.js'

class LessonService {
  static async create({ subjectId, topic, time, data, isPublished }) {
    const foundedSubject = await findPublishedSubjectBySubjectId(subjectId)
    if (!foundedSubject) throw new BadRequestError('Not found subject')
    return createLesson(subjectId, topic, time, data, isPublished)
  }

  static getAllPublishedLessonBySubjectId(
    subjectId,
    { limit, page, sort, select },
  ) {
    const skip = (page - 1) * limit
    return findAllPublishedLessonBySubjectId(subjectId, {
      limit,
      skip,
      sort,
      select,
    })
  }
}

export default LessonService
