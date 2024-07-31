import express from  "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors";
import taskRoutes from './routes/taskRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send("Backend is running ....");
})

app.use("/api/auth", authRoutes);

app.use('/api/tasks', taskRoutes);



app.listen(PORT, ()=>{
    console.log(`Running on http://localhost:${PORT}`);
});