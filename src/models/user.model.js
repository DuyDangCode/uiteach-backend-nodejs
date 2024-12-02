import mongoose, { Schema } from 'mongoose'

const COLLECTION_NAME = 'users'
const DOCUMENT_NAME = 'user'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      maxLength: 255,
      unique: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dqcsednbr/image/upload/v1732502600/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5_pyvagm.jpg',
    },
    username: {
      type: String,
      maxLength: 50,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      maxLength: 50,
    },
    password: {
      type: String,
      maxLength: 200,
      required: true,
    },
    status: {
      type: String,
      enum: ['activate', 'inactivate'],
      default: 'activate',
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'student',
      enum: ['student', 'admin'],
    },
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
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

export default mongoose.model(DOCUMENT_NAME, userSchema)
