import Router from "express";
import uploadImages from "../controller/images";
import cloudinary from "../config/cloudinaryConfig";

const routerImages = Router();

routerImages.get("/get-signature", (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp
        },
        process.env.CLOUDINARY_API_SECRET
    )
    res.json({ timestamp, signature })
})

//routerImages.post("/upload", uploadImages);

export default routerImages;