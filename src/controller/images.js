import cloudinary from "../config/cloudinaryConfig";

const uploadImage = async (req, res) => {
    try {
        const images = req.files.map(file => file.path);
        const uploadedImages = [];
        for (let image of images) {
            const results = await cloudinary.uploader.upload(image);
            uploadedImages.push(
                {
                    url: results.secure_url,
                    publicID: results.public_id,
                }
            )
        }
        return res.status(200).json(
            {
                message: "Uploaded successfully",
                data: uploadedImages,
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                name: error.name,
                message: error.message,
            }
        )
    }
}

export default uploadImage;