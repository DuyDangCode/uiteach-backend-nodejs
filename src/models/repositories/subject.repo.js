import subjectModel from '../subject.model.js'

const find = ({
  filter = {},
  limit = 10,
  skip = 0,
  sort = { update: -1 },
  select,
}) => {
  Object.assign(filter, { isDelete: false })
  return subjectModel
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()
}

const findAllPublishedSubject = ({ limit, skip, sort, select }) => {
  return find({ filter: { isPublished: true }, limit, skip, sort, select })
}

const findAllPublishedSubjectWithCourseId = (
  courseId,
  { limit, skip, sort, select },
) => {
  return find({
    filter: { courseId, isPublished: true },
    limit,
    skip,
    sort,
    select,
  })
}

const createSubject = (
  title,
  image,
  subjectId,
  courseId,
  duration,
  { description, isPublished, teachBy } = {},
) => {
  return subjectModel.create({
    title,
    image,
    courseId,
    subjectId,
    duration,
    description,
    isPublished,
    teachBy,
  })
}

export {
  findAllPublishedSubject,
  findAllPublishedSubjectWithCourseId,
  createSubject,
}
