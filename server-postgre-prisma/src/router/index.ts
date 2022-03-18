import express from 'express';
import UserController from '../controllers/user-controller';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-middleware';

const router = new express.Router();

router.post('/registration',
  body('email').isEmail(),
  body('username').isLength({ min: 3, max: 32 }),
  body('password').isLength({ min: 3, max: 32 }),
  UserController.registration);
router.post('/login', UserController.login);
router.delete('/delete/:userId', UserController.delete);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);

export default router;
