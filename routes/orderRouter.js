import express from 'express';
import * as orderController from '../controllers/orders.js';
import {authenticateToken} from '../middlewares/jwt.js'
import {adminAuth} from '../middlewares/admin.js'

const router = express.Router();

router.post('/order', authenticateToken, orderController.createOrder);
router.get('/orders', authenticateToken, orderController.getAllOrders);
router.get('/order/:id', authenticateToken, orderController.getOrderById);
router.put('/order/:id', adminAuth, orderController.updateOrder);
router.patch('/order/:id', adminAuth, orderController.partialUpdateOrder);
router.delete('/order/:id', authenticateToken, orderController.deleteOrder);

export default router;