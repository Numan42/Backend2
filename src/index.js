import app from "./app";
import { ConnectDB } from "./DB";

const port = process.env.PORT || 3000

ConnectDB()

    .then(() => {
        app.listen(port, () => {
            console.log(`server is listen on port ${port}`);
        })
    }).catch((error) => {

    })