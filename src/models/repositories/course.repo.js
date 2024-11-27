import courseModel from '../course.model.js'

const createCourse = (name, courseId, { description, isPublished } = {}) => {
  return courseModel.create({ name, courseId, description, isPublished })
}

const find = ({
  filter = {},
  limit = 10,
  skip = 0,
  sort = { update: -1 },
  select,
} = {}) => {
  Object.assign(filter, { isDelete: false })
  return courseModel
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()
}

const findAllPublishedCourse = ({ limit, skip, sort, select } = {}) => {
  return find({ filter: { isPublished: true }, limit, skip, sort, select })
}

const findPublisedCourseByCourseId = (courseId) => {
  return courseModel.findOne({ isPublished: true, courseId })
}

export { createCourse, findPublisedCourseByCourseId, findAllPublishedCourse }
