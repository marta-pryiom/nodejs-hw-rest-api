import pkg from 'mongoose'
import Contact from '../../model/contacts'

const { Types } = pkg

const getStatistic = async (id) => {
  const data = await Contact.aggregate([
    { $match: { owner: Types.ObjectId(id) } },
    {
      $group: {
        _id: 'stats',
        totalAge: { $sum: '$age' },
        minAge: { $min: '$age' },
        maxAge: { $max: '$age' },
        avgAge: { $avg: '$age' },
      },
    },
  ])
  return data
}
export { getStatistic }
