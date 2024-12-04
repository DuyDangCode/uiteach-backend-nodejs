import mongoose from 'mongoose'
import dataProcess from './dataProcess.model.js'

const COLLECTION_NAME = 'processes'
const DOCUMENT_NAME = 'process'

const processSchema = new mongoose.Schema(
  {
    subjectId: {
      type: String,
      required: true,
      ref: 'subject',
    },
    userEmail: {
      type: String,
      required: true,
      maxLength: 255,
      ref: 'user',
    },
    status: {
      type: Boolean,
      default: false,
    },
    data: {
      type: [dataProcess],
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

processSchema.index({ userEmail: 1, subjectId: 1 })

export default mongoose.model(DOCUMENT_NAME, processSchema)
