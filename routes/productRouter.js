import express from 'express'
import {authenticateToken} from '../middlewares/jwt.js'
import * as productsController from "../controllers/products.js";
import {upload} from '../config/multer.js'
import {getProductById, partitionUpdate} from "../controllers/products.js";


const router = express.Router()

router.post('/product', authenticateToken, upload.single('file'), productsController.createProduct)
router.get('/products', authenticateToken, productsController.getAllProducts)
router.get('/products/:id',authenticateToken, productsController.getProductById)
router.put('/product/:id', authenticateToken, upload.single('file'), productsController.updateProduct)
router.patch('/product/:id', authenticateToken, productsController.partitionUpdate)
router.delete('/product/:id', authenticateToken, productsController.deleteProduct)


export default router;