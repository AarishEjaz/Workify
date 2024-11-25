import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import testRoutes from './routes/testRoutes.js'
import morgan from "morgan"
import "express-async-errors"
import cors from "cors"
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from "./middlewares/errorMiddlware.js"
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoute.js'
import helmet from "helmet"
import xss from "xss-clean"
import mongoSanitize from "express-mongo-sanitize"

dotenv.config()

connectDB()

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "job portal applicaiton",
      description: "node express js job portal application",
    },
    servers: [
      {
        url: "http//localhost:8080",
      },
    ],
  },
  apis:['./routes/*.js'],
};

const spec  = swaggerJsdoc(options)

const app = express()

app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json())
app.use(cors())
app.use(morgan())

app.use('/api/v1/test',testRoutes)
app.use('/api/v1/auth',authRoutes)
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobsRoutes);

//Home route
app.use("/api-doc",swaggerUi.serve, swaggerUi.setup(spec))

app.use(errorMiddleware)



const PORT = process.env.PORT
 app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.DEV_MODE} mode on PORT ${PORT}`)
 })