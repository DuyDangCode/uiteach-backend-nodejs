import { BadRequestError } from '../core/error.res.js'
import { findPublisedCourseByCourseId } from '../models/repositories/course.repo.js'
import {
  createSubject,
  findAllPublishedSubject,
  findAllPublishedSubjectWithCourseId,
} from '../models/repositories/subject.repo.js'

class SubjectService {
  static async create({
    title,
    image,
    subjectId,
    courseId,
    duration,
    description,
    isPublished,
    teachBy,
  }) {
    const foundedCourse = await findPublisedCourseByCourseId(courseId)
    if (!foundedCourse) throw new BadRequestError('Not found courseId')

    if (!subjectId)
      subjectId =
        courseId +
        '-' +
        title
          .split(' ')
          .map((word) => word[0].toUpperCase())
          .join('') +
        '-' +
        Math.round(Math.random() * 100)

    return createSubject(title, image, subjectId, courseId, duration, {
      description,
      isPublished,
      teachBy,
    })
  }

  static getAllPublished({ limit = 10, page = 1, sort, select }) {
    const skip = (page - 1) * limit
    return findAllPublishedSubject({ limit, skip, sort, select })
  }

  static getAllPublishedWithCourseId(
    courseId,
    { limit = 5, page = 1, sort, select },
  ) {
    const skip = (page - 1) * limit
    return findAllPublishedSubjectWithCourseId(courseId, {
      skip,
      limit,
      sort,
      select,
    })
  }
}

export default SubjectService
