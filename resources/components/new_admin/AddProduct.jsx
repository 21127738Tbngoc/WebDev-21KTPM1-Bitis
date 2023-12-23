import React, { useState } from 'react'
import { Container, Row, Col, FormGroup } from 'reactstrap';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AddProduct = () => {

  const Token = localStorage.getItem("Token")
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [image, setimage] = useState(null);
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState('');
  const [brand, setbrand] = useState('');
  const [qty, setqty] = useState('');
  const [color, setcolor] = useState('');
  const [pattern, setpattern] = useState('');
  const [categories, setCategories] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };


  const [api_key] = useState("739115358895497");
  const [cloud_name] = useState("dxsvumas8");
  const [photoDataArray, setPhotoDataArray] = useState([]);


  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    // Kiểm tra xem đã chọn category này chưa
    if (categories.includes(selectedCategory)) {
      // Nếu đã chọn, hãy loại bỏ nó khỏi danh sách
      const updatedCategories = categories.filter(
        (category) => category !== selectedCategory
      );
      setCategories(updatedCategories);
    } else {
      // Nếu chưa chọn, thêm nó vào danh sách
      setCategories([...categories, selectedCategory]);
    }
  };



  const AddProductHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {


      // Upload image to Cloudinary
      const signatureResponse = await axios.get("http://localhost:5000/get-signature");
      const files = document.querySelector("#file-field").files;
      console.log(files);
      // Check if there are files to upload
      if (files.length === 0) {
        console.log("No files selected for upload");
        return;
      }

      const newPhotoDataArray = [];

      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("api_key", api_key);
        data.append("signature", signatureResponse.data.signature);
        data.append("timestamp", signatureResponse.data.timestamp);

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
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

      setPhotoDataArray(newPhotoDataArray);

      // send the array of image info back to our server
      await axios.post("http://localhost:5000/do-something-with-photos", { photos: newPhotoDataArray });
      console.log("Photos uploaded successfully");

      const cloudinaryImageUrl = newPhotoDataArray;




      function generateImageURL(publicId) {
        return `https://res.cloudinary.com/${cloud_name}/image/upload/${publicId}.jpg`;
      }

      // Save product info to MongoDB
      const productData = {
        name,
        desc: description,
        categories,
        tags,
        price,
        img: newPhotoDataArray.map(item => generateImageURL(item.public_id)),
        brand,
        qty,
        color,
        pattern,
      };
      console.log(productData);

      const headers = {
        token: " bearer " + Token
      };


      const mongoResponse = await axios.post('http://localhost:5000/api/products/', productData, { headers });









      setLoading(false);

      //navigate('/dashboard/all-products');

    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }

  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className='mb-5'>Add Product</h4>
            <form onSubmit={AddProductHandler}>
              <FormGroup className='form__group'>
                <span>Product Name</span>
                <input type="text" placeholder='Double Sofa' onChange={(e) => (setname(e.target.value))} required />
              </FormGroup>
              <FormGroup className='form__group'>
                <span>Description</span>
                <input type="text" placeholder='Description' onChange={(e) => (setdescription(e.target.value))} required />
              </FormGroup>
              <FormGroup className='form__group w-50'>
                <span>Price</span>
                <input type="number" placeholder='$100' onChange={(e) => (setprice(e.target.value))} required />
              </FormGroup>
              <div className='d-flex align-items-center justify-content-between gap-5'>
                <FormGroup className='form__group w-50 '>
                  <span>Categories</span>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        value="sofa"
                        onChange={handleCategoryChange}
                        checked={categories.includes("sofa")}
                      />
                      Sofa
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="chair"
                        onChange={handleCategoryChange}
                        checked={categories.includes("chair")}
                      />
                      Chair
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="table"
                        onChange={handleCategoryChange}
                        checked={categories.includes("table")}
                      />
                      Table
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        value="Other"
                        onChange={handleCategoryChange}
                        checked={categories.includes("Other")}
                      />
                      Khong biet category gi nua ...
                    </label>
                  </div>
                </FormGroup>
              </div>
              <FormGroup className='form__group w-50'>
                <span>Tags</span>
                <div>
                  {tags.map((tag) => (
                    <div key={tag} className="tag-item">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        X
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Enter a tag"
                    value={tagInput}
                    onChange={handleTagInputChange}
                  />
                  <button type="button" onClick={addTag}>
                    +
                  </button>
                </div>
              </FormGroup>


              <div>
                <FormGroup className='form__group'>
                  <span>Product Image</span>
                  <input type="file" id='file-field' onChange={(e) => { setimage(e.target.files[0]) }} multiple required />
                </FormGroup>
              </div>
              <FormGroup className='form__group w-50'>
                <span>Brand</span>
                <input type="text" placeholder='' onChange={(e) => (setbrand(e.target.value))} required />
              </FormGroup>

              <FormGroup className='form__group w-50'>
                <span>Qty</span>
                <input type="number" placeholder='999' onChange={(e) => (setqty(e.target.value))} required />
              </FormGroup>

              <FormGroup className='form__group w-50'>
                <span>Color</span>
                <input type="color" onChange={(e) => (setcolor(e.target.value))} required />
              </FormGroup>

              <FormGroup className='form__group w-50'>
                <span>Pattern</span>
                <input type="text" placeholder='none' onChange={(e) => (setpattern(e.target.value))} required />
              </FormGroup>

              <button type="submit" onClick={AddProductHandler} className='buy__btn text-white'>Add Product</button>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export { AddProduct };