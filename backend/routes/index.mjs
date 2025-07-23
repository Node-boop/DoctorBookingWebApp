import { Router } from "express";
import patientRoutes from './patients.mjs'
import doctorRoutes from './doctors.mjs'
import adminRoutes from './admin.mjs'

const router = Router()

router.use(patientRoutes)
router.use(adminRoutes)
router.use(doctorRoutes)
export default router