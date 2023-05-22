import dotenv from 'dotenv'
dotenv.config()

import express from "express";
const app = express();

// middleware
app.use(express.json())

import pool from './server/db.js';

app.listen(
    process.env.PORT,
    () => console.log(`Server is running on port ${process.env.PORT}`)
)

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello World"
    })
})