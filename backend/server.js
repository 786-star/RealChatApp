import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'

const PORT = process.env.PORT

const app = express()

app.use(cors())

app.listen(PORT, (req, res) => {
    console.log(`Server is running at PORT : ${PORT}`)
})
