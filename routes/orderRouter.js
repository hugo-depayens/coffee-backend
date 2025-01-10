import express from 'express';
import * as orderController from '../controllers/orders.js';

const router = express.Router();

router.post('/order', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/order/:id', orderController.getOrderById);
router.put('/order/:id', orderController.updateOrder);
router.patch('/order/:id', orderController.partialUpdateOrder);
router.delete('/order/:id', orderController.deleteOrder);

export default router;