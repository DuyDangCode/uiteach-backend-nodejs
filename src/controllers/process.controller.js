import { CREATED, OK } from '../core/success.res.js'
import ProcessService from '../services/process.service.js'

class ProcessController {
  static async create(req, res) {
    return new CREATED({
      message: 'UIT-LEARN::Create process successful',
      metadata: await ProcessService.createProcess(req.body),
    }).send(res)
  }
  static async completeLesson(req, res) {
    return new OK({
      message: 'UIT-LEARN::Complete lesson successful',
      metadata: await ProcessService.completeLesson(req.body),
    }).send(res)
  }
  static async completeSubject(req, res) {
    return new OK({
      message: 'UIT-LEARN::Complete subject successful',
      metadata: await ProcessService.completeSubject(req.body),
    }).send(res)
  }
  static async get(req, res) {
    return new OK({
      message: 'UIT-LEARN::get process successful',
      metadata: await ProcessService.getProcess(req.body),
    }).send(res)
  }
}

export default ProcessController
