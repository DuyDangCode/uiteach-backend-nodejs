import mongoose, { mongo, Schema } from 'mongoose'

const COLLECTION_NAME = 'DataLessons'
const DOCUMENT_NAME = 'DataLesson'

const dataLessonSchema = new mongoose.Schema(
  {
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

export default dataLessonSchema
