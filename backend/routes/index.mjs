import { Router } from "express";
import patientRoutes from './patients.mjs'
import doctorRoutes from './doctors.mjs'
import adminRoutes from './admin.mjs'
import docsRouter from './openai.mjs'

const router = Router()
router.use(docsRouter)
router.use(patientRoutes)
router.use(adminRoutes)
router.use(doctorRoutes)
export default router