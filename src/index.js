import app from "./app";
import { ConnectDB } from "./DB";
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