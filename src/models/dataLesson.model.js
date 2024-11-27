import mongoose, { mongo, Schema } from 'mongoose'
import { PRO } from '../configs/config.env'

const COLLECTION_NAME = 'DataLessons'
const DOCUMENT_NAME = 'DataLesson'

const dataLessonSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    videoId: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
)
dataLessonSchema.pre('save', async function (next) {
  if (!this.id) {
    const lastDocument = await this.constructor.findOne().sort('-id')
    this.id = lastDocument ? lastDocument.id + 1 : 1 // Increment from the last id
  }
  next()
})
dataLessonSchema.index({ id: 1 })

export default mongoose.model(DOCUMENT_NAME, dataLessonSchema)
