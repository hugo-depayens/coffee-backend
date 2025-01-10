import express from 'express'
import {authenticateToken} from '../middlewares/jwt.js'
import {adminAuth} from '../middlewares/admin.js'
import * as productsController from "../controllers/products.js";
import {upload} from '../config/multer.js'
import {getProductById, partitionUpdate} from "../controllers/products.js";


const router = express.Router()

router.post('/product', adminAuth, upload.single('file'), productsController.createProduct)
router.get('/products', authenticateToken, productsController.getAllProducts)
router.get('/products/:id',authenticateToken, productsController.getProductById)
router.put('/product/:id', adminAuth, upload.single('file'), productsController.updateProduct)
router.patch('/product/:id', adminAuth,  upload.single('file'), productsController.partitionUpdate)
router.delete('/product/:id', adminAuth, productsController.deleteProduct)


export default router;