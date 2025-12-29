import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import connectToDatabase from './config/db.js'
connectToDatabase()

const PORT = process.env.PORT

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.listen(PORT, (req, res) => {
    console.log(`Server is running at PORT : ${PORT}`)
})
