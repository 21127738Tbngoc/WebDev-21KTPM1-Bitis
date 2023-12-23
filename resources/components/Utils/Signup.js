import React, { useEffect, useState } from 'react';
import { Helmet } from '../helmet/Helmet';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const Signup = () => {
  const [image,setimage]=useState(null);
  const [name, setName] = useState('');
  const [username, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



    
  const [api_key] = useState("739115358895497");
  const [cloud_name] = useState("dxsvumas8");
  const [photoDataArray, setPhotoDataArray] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      const userData = {
      
        avatar: newPhotoDataArray.map(item => generateImageURL(item.public_id)),
        name,
        username,
        email,
        password,
        address,
        phone,
      };
      console.log(userData);
      
      const response = await axios.post('http://localhost:5000/api/auth/register/', userData);





      


      setLoading(false);
      toast.success('Signup Successful');
      navigate('/login');
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
              <Col lg='6' className='m-auto text-center'>
                <h3 className='fw-bold mb-4'>Signup</h3>
                <form action='' className='auth__form' onSubmit={signupHandler}>


                  <div>
                   <FormGroup className='form__group'>
                  <span>Avatar</span>
                   <input type="file"  id='file-field' onChange={(e)=>{setimage(e.target.files[0])}} multiple  required/>
                  </FormGroup>
                  </div>

                  {/* Other form fields */}
                  <FormGroup className='form__group'>
                    <input
                      type='text'
                      placeholder='Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input
                      type='text'
                      placeholder='Username'
                      value={username}
                      onChange={(e) => setUser(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input
                      type='email'
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input
                      type='text'
                      placeholder='Address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input
                      type='text'
                      placeholder='Phone'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </FormGroup>
                  <button className='buy__btn auth__btn'>Signup</button>
                  <p>
                    Already have an account? <Link to='/login'>Signin</Link>
                  </p>
                </form>
              </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
