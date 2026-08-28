import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGOOSE_URI}/${DB_NAME}`)
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
}
