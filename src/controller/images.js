import cloudinary from "../config/cloudinaryConfig";
import axios from "axios"
import product from "../model/product"

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

const AddProductHandler = async (e) => {
    e.preventDefault();
    try {

        // Upload image to Cloudinary
        const signatureResponse = await axios.get("/get-signature");
        const files = document.querySelector("#file-field").files;
        console.log(files);
        // Check if there are files to upload
        if (files.length === 0) {
            console.log("No files selected for upload");
            return;
        }

        const newPhotoDataArray = [];

        for (let file of files) {
            const data = new FormData();
            data.append("file", file);
            data.append("api_key", process.env.CLOUDINARY_API_KEY);
            data.append("signature", signatureResponse.data.signature);
            data.append("timestamp", signatureResponse.data.timestamp);

            const cloudinaryResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: function (e) {
                        console.log(e.loaded / e.total);
                    },
                }
            );

            const photoData = {
                public_id: cloudinaryResponse.data.public_id,
                version: cloudinaryResponse.data.version,
                signature: cloudinaryResponse.data.signature,
            };

            newPhotoDataArray.push(photoData);
        }

        // send the array of image info back to our server
        // await axios.post("http://localhost:5000/do-something-with-photos", { photos: newPhotoDataArray });
        // console.log("Photos uploaded successfully");

        const cloudinaryImageUrl = newPhotoDataArray;

        function generateImageURL(publicId) {
            return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.jpg`;
        }

        // Save product info to MongoDB
        const productData = {
            name,
            desc: e.description,
            categories: e.categories,
            tags: e.tags,
            price: e.price,
            img: newPhotoDataArray.map(item => generateImageURL(item.public_id)),
            quantity: e.qty,
            color: e.color,
        };
        console.log(productData);

        const headers = {
            token: " bearer " + Token
        };


        const mongoResponse = await axios.post('http://localhost:5000/api/products/', productData, { headers });

        //navigate('/dashboard/all-products');

    } catch (err) {
        toast.error(err.message);
        setLoading(false);
    }

}

export default uploadImage;