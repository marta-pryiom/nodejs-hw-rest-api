import Contact from '../../model/contacts'

const getContactById = async (userId, id) => {
  const result = await Contact.findOne({
    _id: id,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email age role',
  })
  return result
}
export default getContactById
