import express from 'express'
import * as userController from '../controllers/users.js'
import {authenticateToken} from '../middlewares/jwt.js'


const router = express.Router();

router.post('/me', authenticateToken, userController.getUser);
router.get('/users', authenticateToken, userController.getUsers);
router.get('/user/:id', authenticateToken, userController.getUsersById);
router.put('/user/:id', authenticateToken, userController.updateUserById);
router.patch('/user/:id', authenticateToken, userController.partialUpdateUserById);
router.delete('/user/:id', authenticateToken, userController.deleteUserById);
// router.delete('/user/:id', authenticateToken, userController.deleteUser);


export default router;
