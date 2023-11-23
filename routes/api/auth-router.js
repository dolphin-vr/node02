import express from 'express';
import authController from '../../controllers/auth-controller.js';
import { isEmptyBody } from '../../middlewares/index.js';
import {bodyValidator} from '../../decorators/index.js';
import { SignInSchema, SignUpSchema } from '../../models/User.js';

const router = express.Router();

router.post('/signup', isEmptyBody, bodyValidator(SignUpSchema), authController.signUp);
router.post('/signin', isEmptyBody, bodyValidator(SignInSchema), authController.signIn);

export default router;