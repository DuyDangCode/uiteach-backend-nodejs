import lessonModel from '../lesson.model.js'

const findAllPublishedLessonBySubjectId = (subjectId) => {
  return find({ filter: { subjectId, isPublished: true } })
}

const createLesson = (subjectId, topic, time, data, isPublished = false) => {
  return lessonModel.create({ subjectId, topic, time, data, isPublished })
}

const find = ({
  filter = {},
  limit = 10,
  skip = 0,
  sort = { update: -1 },
  select,
} = {}) => {
  Object.assign(filter, { isDelete: false })
  return lessonModel
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()
}

export { createLesson, findAllPublishedLessonBySubjectId }
