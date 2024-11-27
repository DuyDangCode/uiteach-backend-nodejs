import mongoose, { Schema } from 'mongoose'

const COLLECTION_NAME = 'subjects'
const DOCUMENT_NAME = 'subject'

const subjectSchema = new mongoose.Schema(
  {
    image: {
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
    isPublished: {
      type: Boolean,
      default: false,
    },
    subjectId: {
      type: String,
      unique: true,
      required: true,
    },
    courseId: {
      type: String,
      ref: 'course',
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    teachBy: {
      type: String,
      default: 'unknow',
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

subjectSchema.index({ subjectId: 1 })

export default mongoose.model(DOCUMENT_NAME, subjectSchema)
