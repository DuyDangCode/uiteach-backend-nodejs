import mongoose from 'mongoose'

const COLLECTION_NAME = 'processDatas'
const DOCUMENT_NAME = 'processData'

const dataProcess = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
)

export default dataProcess
