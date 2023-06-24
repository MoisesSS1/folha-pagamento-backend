import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import userRoutes from "./routes/userRoutes"
import cors from "cors"

const port = process.env.port || 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use(userRoutes)

app.listen(port, () => {
    console.log("Servidor online!")
})