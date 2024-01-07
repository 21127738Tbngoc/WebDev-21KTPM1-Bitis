import {uploadImages} from "./cloudinary"
import axios from 'axios';

export const AddProductHandler = async (data) => {
    data.preventDefault();

    try {
        const files = data.files.map(file => file.path);
        console.log(files);
        // Check if there are files to upload
        if (files.length === 0) {
            console.log("No files selected for upload");
            return;
        }

        const newPhotoArray = uploadImages(files);

        const product = {
            name: data.name,
            price: data.price,
            desc: data.description,
            rating_average: 0,
            short_description: data.short_description,
            description: data.description,
            categories: data.categories,
            images: newPhotoArray,
            quantity: data.quantity,
            date: Date.now(),
            status: data.status,
        };

        console.log(product);

        return await axios.post("https://localhost:3000/admin/add-product", product);
        
    } catch (err) {
        return err.message;
    }
}

export const UpdateProductHandler = async (req, res) =>
{
    
}