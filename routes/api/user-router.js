import express from 'express';
import userController from '../../controllers/user-controller.js'
import { authentication, isEmptyBody } from '../../middlewares/index.js';
import bodyValidator from '../../decorators/bodyValidator.js';
import { SubscriptionSchema } from '../../models/User.js';

const router = express.Router();

router.patch('/', authentication, isEmptyBody, bodyValidator(SubscriptionSchema), userController.subscriptionUpdate);

export default router;