import {
  createCourse,
  findAllPublishedCourse,
  findPublisedCourseByCourseId,
} from '../models/repositories/course.repo.js'

class CourseService {
  static create({ name, courseId, description, isPublished }) {
    return createCourse(name, courseId, { description, isPublished })
  }
  static getAllPublished({ limit = 10, page = 1, sort, select }) {
    const skip = (page - 1) * limit
    return findAllPublishedCourse({ limit, skip, sort, select })
  }

  static getPublishedByCourseId(courseId) {
    return findPublisedCourseByCourseId(courseId)
  }
}

export default CourseService
