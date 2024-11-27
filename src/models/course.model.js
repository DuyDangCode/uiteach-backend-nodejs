import mongoose, { Schema } from 'mongoose'

const COLLECTION_NAME = 'courses'
const DOCUMENT_NAME = 'course'

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    courseId: {
      type: String,
      unique: true,
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

courseSchema.index({ courseId: 1 })

export default mongoose.model(DOCUMENT_NAME, courseSchema)
