import express from 'express';
import contactController from "../../controllers/controller.js";
import isEmptyBody from '../../middlewares/isEmptyBody.js';

const router = express.Router();

router.get('/', contactController.getAll);

router.get('/:id', contactController.getById);

router.post('/', isEmptyBody, contactController.add);

router.put('/:id', isEmptyBody, contactController.updateById);

router.delete('/:id', contactController.deleteById);

export default router
