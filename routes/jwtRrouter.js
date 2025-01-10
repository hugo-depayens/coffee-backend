import express from 'express'
import {refreshAccessToken} from '../controllers/jwt_refresh.js'

const router = express.Router()

router.post('/refresh', refreshAccessToken)


export default router;