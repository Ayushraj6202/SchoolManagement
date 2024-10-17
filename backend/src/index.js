import express from 'express';
import connectDB from './config/connectDB.js'
//app.use things
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config();

const app = express()
connectDB();
app.use(cors({credentials:true}))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// ALL routers

import studentRouter from './controllers/addStudent.controller.js'
//http://localhost:3000/api/student
app.use('/api/student',studentRouter);

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log('listining at port ',PORT);
})