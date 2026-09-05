import { Router } from "express";
import { UserRegister } from "../controllers/user.controller.js";
import {upload} from '../middlewares/multer.js'

const router = Router();

router.route("/register").post(  // allows to send multipart/form-data request with multiple files
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "cover", maxCount: 1 }
    ]),
    UserRegister);

export default router;




