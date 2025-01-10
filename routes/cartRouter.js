import express from 'express'
import {authenticateToken} from '../middlewares/jwt.js'
import * as cartController from "../controllers/cart.js";

const router = express.Router()

router.post('/cart', authenticateToken ,cartController.addCart)
router.get('/cart_all', authenticateToken, cartController.getAllCart)
router.get('/cart', authenticateToken, cartController.getCartById)
router.delete('/cart_item', authenticateToken, cartController.deleteItem)
router.delete('/cart_clear', authenticateToken, cartController.clearCart)

export default router;