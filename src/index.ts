import dotenv from 'dotenv'
// loads .env file contents into process.env.
dotenv.config()

import express from "express";
// Creates an Express application.
const app = express();

// middleware
app.use(express.json())

import pool from './server/db.js';

app.listen(
    process.env.PORT,
    () => console.log(`Server is running on port ${process.env.PORT}`)
)

app.get("/todos", async (req, res) => {
    const client = await pool.connect()
    try {
        const todos = await client.query("SELECT * FROM todos ORDER BY todo_id ASC")
        res.status(200).send(todos)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Server Error"
        })
    } finally {
        client.release()
    }
})

app.get("/", async (req, res) => {
    res.status(200).send({
        message: "Hello World"
    })
})