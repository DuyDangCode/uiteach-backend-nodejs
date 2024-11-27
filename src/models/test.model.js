import mongoose from 'mongoose'

const COLLECTION_NAME = 'tests'
const DOCUMENT_NAME = 'test'

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageTest: {
      type: [String],
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
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

export default mongoose.model(DOCUMENT_NAME, testSchema)
