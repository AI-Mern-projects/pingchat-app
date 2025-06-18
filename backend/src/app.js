import express, { json } from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes.js'
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware.js";
dotenv.config(); 
connectDB();
const app =express();
app.use(express.json());
const port= process.env.PORT||3000;
app.use(errorHandler);
app.use('/api/auth/',authRoutes);

app.listen(port, ()=>{
    console.log(`server is runing on the port ${port}`);
})