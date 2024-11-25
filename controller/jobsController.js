import jobsModel from "../models/jobsModel.js"
import mongoose from "mongoose"
import moment from "moment"




export const createJobController = async(req,res,next )=>{
    const {company,position} = req.body
    if(!company || !position){
        next("please provide all fields")
    }
    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({job})

}

export const getAllJobsController = async(req,res,next) =>{
    const {status,workType,search,sort} = req.query

    const queryObject = {
        createdBy:req.user.userId
    }

    if(status && status !== 'all'){
        queryObject.status = status
    }
    if(workType && workType !== 'all'){
        queryObject.workType = workType
    }
    if(search ){
        queryObject.position = {$regex: search, $options: "i"}
    }

    let queryResult =  jobsModel.find(queryObject)


    if(sort==="latest"){
        queryResult = queryResult.sort('-createdAt')
    }
    if(sort==="oldest"){
        queryResult = queryResult.sort("createdAt");
    }
    if (sort === "a-z") {
      queryResult = queryResult.sort("position");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("-position");
    }

    //pagination
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit
    queryResult = queryResult.skip(skip).limit(limit)
    const totalJobs = await jobsModel.countDocuments(queryResult)
    const numOfPage = Math.ceil(totalJobs / limit)


    const jobs = await queryResult


    // const jobs = await jobsModel.find({createdBy:req.user.userId})
    res.status(200).json({
        total: jobs.length,
        jobs:jobs
    })

}

export const updateJobsController = async(req,res,next) =>{
    const {id} = req.params
    const {company,position,createdBy} = req.body
    if(!company||!position) {
        next('please provide all fields ')
    }
    const job = await jobsModel.findOne({_id:id})
    if(!job){
        next(`no job found with the provided id: ${id}`)
    }
    if (req.user.userId === job.createdBy.toString()) {
      //------------------------------------------- already working but will lookover later

      const upadteJob = await jobsModel.findOneAndUpdate(
        { _id: id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ upadteJob });
    } else {
      console.log("you are not allowed to do so ");
      res.status(400).json({ message: "the operation cannot be allowed" });
    }



}

export const deleteJobController = async(req,res,next) =>{
    const {id} =req.params
    const job = await jobsModel.findOne({_id:id})
    if(!job){
        next(`job not found with the id : ${id}`)
    }
    if(req.user.userId === job.createdBy.toString()){
        await jobsModel.findByIdAndDelete(id)
        res.status(200).json({message:'job deleted'})
    }else{
        res.status(404).json({message:"you are not allowed to delete the job"})
    }
}

export const jobsStatsController = async(req,res,next) =>{
    const stats = await jobsModel.aggregate([
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId)
            },
        },{
        $group:{
                _id:`$status`,
                count:{$sum:1},
            }
        }
    ])
    const defaultStats = {
      pending: stats.pending || 0,
      reject: stats.reject || 0,
      interview:stats.interview || 0
    };

    let monthlyApplications = await jobsModel.aggregate([
        {
            $match:{
                createdBy:new mongoose.Types.ObjectId(req.user.userId)
            }
        },
        {
            $group:{
                _id:{
                    year:{$year:'$createdAt'},
                    month:{$month:'$createdAt'}
                },
                count:{
                    $sum:1
                },
            },
        },
    ])
    monthlyApplications = monthlyApplications.map(item=>{
        const {_id:{year,month},count} = item
        const date = moment().month(month-1).year(year).format('MMM Y')
        return {date,count}

    }).reverse()
    res.status(200).json({default: defaultStats,totalJobs:stats.length,monthly:monthlyApplications})
}

export default {
  createJobController,
  getAllJobsController,
  updateJobsController,
  deleteJobController,
  jobsStatsController
};
