import app from './app.js';
import { ConnectDB } from "./DB/index.js";
import dotenv from 'dotenv'

dotenv.config({
    path: "./env"
})

const port = process.env.PORT || 3000

ConnectDB()

    .then(() => {
        app.listen(port, () => {
            console.log(`server is listen on port ${port}`);
        })
    }).catch((error) => {
        console.log("MongoDB connnection failed: ", error);
    })