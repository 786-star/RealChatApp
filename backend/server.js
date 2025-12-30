import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import connectToDatabase from './config/db.js'
import cookieParser from 'cookie-parser';
connectToDatabase()

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';


const PORT = process.env.PORT

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(PORT, (req, res) => {
    console.log(`Server is running at PORT : ${PORT}`)
})
