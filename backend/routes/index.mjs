import { Router } from "express";
import patientRoutes from './patients.mjs'
import doctorRoutes from './doctors.mjs'
import adminRoutes from './admin.mjs'
import docsRouter from './openai.mjs'
import pharmacyRoutes from './pharmacyRoutes.mjs'
const router = Router()
router.use(docsRouter)
router.use(patientRoutes)
router.use(adminRoutes)
router.use(doctorRoutes)
router.use(pharmacyRoutes)



export default router