import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js"
dotenv.config({
    path: './.env'
});
connectDB().then(()=>{
    app.on("error",error=>{
        throw error
    })
    app.listen(process.env.PORT||10000,()=>{
        console.log(`app is listening on ${process.env.PORT}`)
    })
   
}).
catch((e)=>{
    console.log(`Error happened while listing the app ${process.env.PORT}`);
})



