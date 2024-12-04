import processModel from '../process.model.js'

const createProcess = (subjectId, userEmail, status, data) => {
  return processModel.create({ subjectId, userEmail, status, data })
}

const findProcessWithUserEmailAndSubjectId = (userEmail, subjectId) => {
  return processModel.findOne({ userEmail, subjectId, isDelete: false })
}

export { createProcess, findProcessWithUserEmailAndSubjectId }
