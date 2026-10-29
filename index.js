import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import documentRoutes from "./routes/documentRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import cors from "cors"


const app = express()
dotenv.config()
app.use(cors())
console.log(process.env.MONGO_URI)
const PORT = 3000
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log("failed to connect db", err.message)
})

app.use("/api/documents", documentRoutes)
app.use("/api/ai", aiRoutes)

app.listen(PORT,()=>{
    console.log(`server running @${PORT}`)
})

