import processModel from '../process.model.js'

const createProcess = (subjectId, userEmail, status, data) => {
  return processModel.create({ subjectId, userEmail, status, data })
}

const findProcessWithUserEmailAndSubjectId = (userEmail, subjectId) => {
  return processModel.findOne({ userEmail, subjectId, isDelete: false })
}
const findProcessWithUserEmail = (userEmail) => {
  return processModel.find({ userEmail, isDelete: false })
}

export {
  createProcess,
  findProcessWithUserEmailAndSubjectId,
  findProcessWithUserEmail,
}
