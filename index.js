import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
 dotenv.config()



const app = express()
app.use(express.json())

const mongoURI = process.env.MONGO_URI

mongoose.connect(mongoURI).then(() => {
    console.log("MongoDB connected successfully now")
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})