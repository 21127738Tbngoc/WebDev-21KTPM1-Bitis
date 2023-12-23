import React, { useState } from 'react';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const AddArticle = () => {
  const Token = localStorage.getItem('Token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [subtitle, setSubtitle] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const AddArticleHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const articleData = {
        subtitle,
        title,
        author,
        description,
      };

      const headers = {
        token: ' bearer ' + Token,
      };

      const response = await axios.post('http://localhost:5000/api/article/', articleData, { headers });
      console.log(response)

      setLoading(false);
      toast.success('Article added successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      // Optionally, you can redirect to another page after adding the article
      // navigate('/dashboard/all-articles');
    } catch (err) {
      toast.error(err.message || 'Error adding article');
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-5">Add Article</h4>
            <form onSubmit={AddArticleHandler}>
              {/* Update form fields for article information */}
              <FormGroup className="form__group">
                <span>Subtitle</span>
                <input type="text" placeholder="Subtitle" onChange={(e) => setSubtitle(e.target.value)} required />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Title</span>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Author</span>
                <input type="text" placeholder="Author" onChange={(e) => setAuthor(e.target.value)} required />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Description</span>
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
              </FormGroup>

              <button type="submit" className="buy__btn text-white">
                Add Article
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { AddArticle };
