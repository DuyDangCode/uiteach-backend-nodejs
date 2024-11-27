import mongoose, { mongo, Schema } from 'mongoose'
import { PRO } from '../configs/config.env'
import dataLessonModel from './dataLesson.model'

const COLLECTION_NAME = 'lessons'
const DOCUMENT_NAME = 'lesson'

const lessonSchema = new mongoose.Schema(
  {
    subjectId: {
      type: String,
      required: true,
      ref: 'subject',
    },
    topic: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    data: {
      type: [dataLessonModel],
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

lessonSchema.index({ subjectId: 1 })

export default mongoose.model(DOCUMENT_NAME, lessonSchema)
