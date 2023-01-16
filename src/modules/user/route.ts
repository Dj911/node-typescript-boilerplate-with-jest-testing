import express, { Router } from 'express'
import { register, login, getProfile } from '@modules/user/controller'
import { verifyToken } from '@middlewares/common'
const router: Router = express.Router()

router.post('/signup', register)
router.post('/login', login)

router.use(verifyToken)

router.get('/profile', getProfile)
export default router
