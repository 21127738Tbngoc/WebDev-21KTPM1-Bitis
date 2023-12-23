import React, { useState, useEffect, } from 'react';
import { Col, Container, Row,} from 'reactstrap';
import { toast } from 'react-toastify';

const User = () => {
  const Token = localStorage.getItem("Token")
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: " bearer " + Token
          },
        });

        console.log(response)

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const deleteProduct = async (id) => {
    // Implement the logic to delete user using MongoDB API
    // You can make a DELETE request to your server's endpoint
    // For example: `http://localhost:5000/api/users/${id}`
    try {
      // Replace 'YOUR_TOKEN' with the actual token
      const token = 'YOUR_TOKEN';
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token: " bearer " + Token
          },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      toast.success('User deleted successfully');
      // You may want to update the state or fetch updated data here
    } catch (error) {
      console.error(error);
      toast.error('Error deleting user');
    }
  };

  return (
    <Container>
      <Row>
        <Col lg='12'>
          <h4>Users</h4>
        </Col>
        <Col lg="12" className='pt-5'>
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            <table className='table'>
              <thead>
                <tr className='tuble'>
                  <th>Image</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr className='teble' key={index}>
                    <td><img src={user.img} alt="avatar" /></td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => { deleteProduct(user._id) }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default User;
