import {v2 as cloudinary} from 'cloudinary';

const uploadImage = async (imagePath) => {
    cloudinary.config({
        cloud_name: 'dznp9pvou',
        api_key: '433567686685416',
        api_secret: 'vUmo_sce7xEtvRLazDdFQKWo7yQ'
    });
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return {"public_id": result.public_id, "url": result.secure_url};
    } catch (error) {
        console.error(error);
    }
};

const uploadImages = async (files) => {
    cloudinary.config({
        cloud_name: 'dznp9pvou',
        api_key: '433567686685416',
        api_secret: 'vUmo_sce7xEtvRLazDdFQKWo7yQ'
    });
    try {
        const images = files.map(file => file.path);
        if (images.length === 0) {
            return {code: 404, images: null}
        }
        const uploadedImages = [];
        for (let image of images) {
            const results = await cloudinary.uploader.upload(image);
            uploadedImages.push(results.secure_url)
        }
        return {code: 201, message: 'Uploaded successfully', images: uploadedImages};
    } catch (error) {
        return {
            name: error.name,
            message: error.message,
            images: null
        }
    }
}

module.exports = {uploadImage, uploadImages}