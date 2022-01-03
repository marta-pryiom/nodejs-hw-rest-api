import Contact from '../../model/contacts'

const removeContact = async (userId, id) => {
  const result = await Contact.findOneAndRemove({
    _id: id,
    owner: userId,
  })
  return result
}
export default removeContact
