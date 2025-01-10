import express from 'express'
import * as userController from '../controllers/users.js'
import {authenticateToken} from '../middlewares/jwt.js'
import {adminAuth} from '../middlewares/admin.js'


const router = express.Router();

router.post('/me', authenticateToken, userController.getUser);
router.get('/users', adminAuth, userController.getUsers);
router.get('/user/:id', adminAuth, userController.getUsersById);
router.put('/user/:id', adminAuth, userController.updateUserById);
router.patch('/user/:id', adminAuth, userController.partialUpdateUserById);
router.delete('/user/:id', adminAuth, userController.deleteUserById);
// router.delete('/user/:id', authenticateToken, userController.deleteUser);


export default router;
