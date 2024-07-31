import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const DB_URL = process.env.DB_URL;

const connectDB = async() =>{
    const res = await  mongoose.connect(DB_URL);
    if(res){
        console.log("DB connected Successfully");
    }
}

export default connectDB;
