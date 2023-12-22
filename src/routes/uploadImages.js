import Router from "express";
import uploadImages from "../controller/images";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinaryConfig from "../config/cloudinaryConfig";

const routerImages = Router();

const storage = CloudinaryStorage(
    {
        cloudinary: cloudinaryConfig,
        params: {

        }
    }
)

routerImages.post("/upload", uploadImages);

export default routerImages;