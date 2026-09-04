import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import app from "./app.js";
import { ConnectDB } from "./DB/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../.env")
});

console.log("MONGOOSE_URI:", process.env.MONGOOSE_URI);

const port = process.env.PORT || 3000;

ConnectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });