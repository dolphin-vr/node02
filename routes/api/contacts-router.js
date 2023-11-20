import express from 'express';
import contactController from "../../controllers/controller.js";
import {isEmptyBody, isValidId} from '../../middlewares/index.js';
import {bodyValidator} from '../../decorators/index.js';
import { contactsAddSchema, contactsUpdateSchema } from '../../models/Contact.js';

const router = express.Router();

router.route('/')
   .get(contactController.getAll)
   .post(isEmptyBody, bodyValidator(contactsAddSchema), contactController.add);

router.route('/:id')
   .get(isValidId, contactController.getById)
   .put(isValidId, isEmptyBody, bodyValidator(contactsUpdateSchema), contactController.updateById)
   .delete(isValidId, contactController.deleteById);

export default router
