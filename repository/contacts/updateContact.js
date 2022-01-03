import Contact from '../../model/contacts'
const updateContact = async (userId, id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}
export default updateContact
