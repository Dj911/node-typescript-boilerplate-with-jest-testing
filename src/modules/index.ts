import express, { Router } from 'express'
import userRouter from '@modules/user/route'
const router: Router = express.Router()

router.use('/user', userRouter)

export default router
