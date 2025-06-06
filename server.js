const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const AWS = require("aws-sdk");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const signer = new AWS.RDS.Signer({
  hostname: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
});

const token = signer.getAuthToken();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: token,
  database: process.env.DB_NAME,
});
// Convert pool to use promises
const promisePool = pool.promise();

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Successfully connected to database");
  connection.release();
});

// GET todos
app.get("/api/todos", async (req, res) => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM todos");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

// POST todo
app.post("/api/todos", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const [result] = await promisePool.query(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [title, description]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Error creating todo" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
