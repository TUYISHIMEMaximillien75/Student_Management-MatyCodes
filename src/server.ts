import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { connectDB } from "./config";
import { router } from "./routers/StudentsRouter";

const app: Express = express();
dotenv.config();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(router);


connectDB().then(()=>{
app.listen(port, () => {
    console.log("server is running on port " + port)
}) 
})
