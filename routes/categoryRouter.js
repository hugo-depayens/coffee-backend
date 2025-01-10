import express from 'express'
import {authenticateToken} from '../middlewares/jwt.js'
import {adminAuth} from '../middlewares/admin.js'
import * as categoriesController from '../controllers/categories.js'

const router = express.Router()

router.post('/category', adminAuth, categoriesController.createCategory)
router.get('/categories', authenticateToken, categoriesController.getAllCategories)
router.get('/category/:id', authenticateToken, categoriesController.getCategoryById)
router.put('/category/:id', adminAuth, categoriesController.updateCategory)
router.patch('/category/:id', adminAuth, categoriesController.partialUpdateCategory)
router.delete('/category/:id', adminAuth, categoriesController.deleteCategory)

export default router;