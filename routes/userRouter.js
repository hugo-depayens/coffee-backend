import express from 'express'
import {getUser, getUsers, getUsersById, updateUserById, partialUpdateUserById, deleteUserById} from '../controllers/users.js'
import {authenticateToken} from '../middlewares/jwt.js'


const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   post:
 *     summary: Получение списка пользователей
 *     description: Возвращает массив пользователей
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.post('/me', getUser);
router.get('/users', getUsers);
router.get('/user/:id', getUsersById);
router.put('/user/:id', updateUserById);
router.patch('/user/:id', partialUpdateUserById);
router.delete('/user/:id', deleteUserById);
// router.delete('/user/:id', authenticateToken, userController.deleteUser);


export default router;
