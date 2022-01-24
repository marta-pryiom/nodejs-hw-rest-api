import {
  allContactsContr,
  contactByIdContr,
  addNewContactContr,
  deleteContactContr,
  updatePartOfContact,
  updateContactContr,
} from '../../controllers'
import {
  validationId,
  updateValidation,
  addValidation,
  validateQuery,
  updateValidationFavor,
} from '../../midllewares/validation/contactValidation'
import { Router } from 'express'
import quard from '../../midllewares/validation/guard'
import wrappedError from '../../midllewares/validation/error-handler'

const router = new Router()

router.get('/', [quard, validateQuery], wrappedError(allContactsContr))
router.get('/:id', [quard, validationId], wrappedError(contactByIdContr))
router.post('/', [quard, addValidation], wrappedError(addNewContactContr))
router.delete('/:id', [quard, validationId],wrappedError( deleteContactContr))
router.put('/:id', [quard, validationId, updateValidation], wrappedError(updateContactContr))
router.patch(
  '/:id/favorite',
  [quard, validationId, updateValidationFavor],
  wrappedError(updatePartOfContact),
)
export default router
