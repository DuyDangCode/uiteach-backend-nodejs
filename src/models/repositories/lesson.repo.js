import lessonModel from '../lesson.model'

const findAllLessonBySubjectId = (subjectId) => {
  return lessonModel.find({ isDelete: false, subjectId })
}

export {}
