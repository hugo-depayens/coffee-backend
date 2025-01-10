import express from 'express'
import {authenticateToken} from '../middlewares/jwt.js'
import * as categoriesController from '../controllers/categories.js'

const router = express.Router()

router.post('/category', authenticateToken, categoriesController.createCategory)
router.get('/categories', authenticateToken, categoriesController.getAllCategories)
router.get('/category/:id', authenticateToken, categoriesController.getCategoryById)
router.put('/category/:id', authenticateToken, categoriesController.updateCategory)
router.patch('/category/:id', authenticateToken, categoriesController.partialUpdateCategory)
router.delete('/category/:id', authenticateToken, categoriesController.deleteCategory)

export default router;