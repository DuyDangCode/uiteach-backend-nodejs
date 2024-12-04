import {
  createProcess,
  findProcessWithUserEmailAndSubjectId,
} from '../models/repositories/process.repo.js'

import { BadRequestError, InternalServerError } from '../core/error.res.js'
import { findAllPublishedLessonBySubjectId } from '../models/repositories/lesson.repo.js'
import processModel from '../models/process.model.js'

class ProcessService {
  static async checkUser({ userId }) {}
  static async createProcess({ subjectId, userEmail, status }) {
    const lessons = await findAllPublishedLessonBySubjectId(subjectId)
    if (!lessons || lessons.length == 0)
      throw new BadRequestError('Not found lessons')
    const data = []

    for (let i = 0; i < lessons.length; i++)
      for (let j = 0; j < lessons[i].data.length; j++) {
        data.push({ videoId: lessons[i].data[j].videoId, status: false })
      }
    return createProcess(subjectId, userEmail, status, data)
  }
  static async completeSubject({ userEmail, subjectId }) {
    const process = await findProcessWithUserEmailAndSubjectId(
      userEmail,
      subjectId,
    )
    if (!process) throw new BadRequestError('Not found process')
    process.status = true
    for (let i = 0; i < process.data.length; i++) {
      process.data[i].status = true
    }
    return processModel.updateOne({ userEmail, subjectId }, process)
  }
  static async completeLesson({ videoId, userEmail, subjectId }) {
    const process = await findProcessWithUserEmailAndSubjectId(
      userEmail,
      subjectId,
    )
    if (!process) throw new BadRequestError('Not found process')
    for (let i = 0; i < process.data.length; i++) {
      if (process.data[i].videoId == videoId) {
        process.data[i].status = true
        break
      }
    }
    return processModel.updateOne({ userEmail, subjectId }, process)
  }
  static getProcess({ userEmail, subjectId }) {
    return findProcessWithUserEmailAndSubjectId(userEmail, subjectId)
  }
}

export default ProcessService
