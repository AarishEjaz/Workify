import express from "express"
import userAuth from "../middlewares/authMiddleware.js"
import {createJobController, deleteJobController, getAllJobsController, jobsStatsController, updateJobsController } from "../controller/jobsController.js"

const router = express.Router()

router.post("/create-job",userAuth,createJobController)
router.get('/get-jobs',userAuth,getAllJobsController)
router.patch('/update-job/:id',userAuth,updateJobsController)
router.delete("/delete-jobs/:id",userAuth,deleteJobController)
router.get("/job-stats",userAuth,jobsStatsController)
export default router