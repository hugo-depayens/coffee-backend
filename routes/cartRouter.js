import express from 'express'
import {authenticateToken} from '../middlewares/jwt.js'
import * as cartController from "../controllers/cart.js";

const router = express.Router()

router.post('/addCart', authenticateToken ,cartController.addCart)
router.get('/getCart', authenticateToken, cartController.getAllCart)
router.get('/getCartById', authenticateToken, cartController.getCartById)
router.delete('/deleteItem', authenticateToken, cartController.deleteItem)
router.delete('/clearCart', authenticateToken, cartController.clearCart)

export default router;