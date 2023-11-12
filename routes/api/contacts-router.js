import { Router } from 'express';
import contactController from "../../controllers/controller.js";

const router = Router()

router.get('/', contactController.getAll);

router.get('/:id', contactController.getById);

router.post('/', contactController.add);

router.put('/:id', contactController.updateById);

router.delete('/:id', contactController.deleteById);

export default router
