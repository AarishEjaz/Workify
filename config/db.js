import mongoose from "mongoose"
import dotenv from 'dotenv'

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to mongo db database ${mongoose.connection.host}`)
    }catch(error){
        console.log(`mongo error ${error.message}`)
    }
}

export default connectDB