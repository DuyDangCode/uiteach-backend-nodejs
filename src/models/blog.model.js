import mongoose from 'mongoose'

const COLLECTION_NAME = 'blogs'
const DOCUMENT_NAME = 'blog'

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
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

export default mongoose.model(DOCUMENT_NAME, BlogSchema)
