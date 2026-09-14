import express from "express";
import cors from "cors";
import path from "node:path";
import dotenv from 'dotenv'
// import courseRoutes from "./routes/courseRoutes";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()
app.use("/uploads",express.static(path.join(process.cwd(),"uploads")));

// app.use("api/courses",)

const port = process.env.Port || 5070;
app.listen(port,()=>console.log(`app is listening to port : ${port}`))