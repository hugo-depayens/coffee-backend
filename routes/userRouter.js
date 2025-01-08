import exports from 'express'
import userController from '../controllers/users.js'
import authenticateToken from '../middlewares/jwt.js'


const router = express.Router();

router.post('/me', authenticateToken, userController.getCurrentUser);
router.get('/users', authenticateToken, userController.getAllUsers);
router.get('/user/:id', authenticateToken, userController.getUserById);
router.put('/user/:id', authenticateToken, userController.updateUser);
router.patch('/user/:id', authenticateToken, userController.partialUpdateUser);
router.delete('/user/:id', authenticateToken, userController.deleteUser);

module.exports = router;
