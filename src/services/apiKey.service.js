import apiKeyModel from '../models/apiKey.model.js'
import crypto from 'node:crypto'

const findById = async (key) => {
  const keyObject = await apiKeyModel.findOne({ key: key, status: true }).lean()
  return keyObject
}

const createApiKey = async () => {
  const keyObject = await apiKeyModel.findOne()
  if (keyObject) {
    console.log(`API_KEY::${keyObject}`)
    return
  }
  const randomByte = crypto.randomBytes(32).toString('hex')
  const newKey = await apiKeyModel.create({
    key: randomByte,
    permissions: ['001'],
  })
  console.log(`API_KEY::${newKey}`)
}

export { findById, createApiKey }
