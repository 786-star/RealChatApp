import express from 'express';
import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT

const app = express()

app.listen(PORT, (req, res) => {
    console.log(`Server is running at PORT : ${PORT}`)
})
