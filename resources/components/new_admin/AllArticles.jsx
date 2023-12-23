import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { toast } from 'react-toastify';


export const AllArticles = () => {
  const Token = localStorage.getItem('Token');
  const [articlesData, setArticlesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numArticles, setNumArticles] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/article/');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      console.log(data);
      setArticlesData(data);
      const totalArticles = data.length;
      setNumArticles(totalArticles);
      localStorage.setItem('numArticles', totalArticles);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`http://localhost:5000/api/article/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: ' bearer ' + Token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      toast.success('Deleted');
      fetchData();
    } catch (error) {
      console.error('Error deleting article:', error);
      toast.error('Error deleting article');
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {loading ? (
              <h4 className='pt-4'>Loading......</h4>
            ) : (
              <table className='table'>
                <thead>
                  <tr className='tuble'>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {articlesData.map((data, index) => (
                    <tr className='table' key={index}>
                      <td>{data.title}</td>
                      <td>{data.subtitle}</td>
                      <td>{data.author}</td>
                      <td>{data.description}</td>
                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={() => {
                            deleteArticle(data._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <h4>Total Number of Articles: {numArticles}</h4>
              </table>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};
