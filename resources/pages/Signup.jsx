import React, { useEffect, useState } from 'react';
import { Helmet } from '../components/helmet/Helmet';
import { Container, Row, Col, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../components/button/buttons.css'; 
import '../components/common.css'; 
import '../components/navbar/navbar.css';

const Signup = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const navigate = useNavigate();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const signupData = {
      username,
      password,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup/', signupData);

      const token = response.data.accessToken;
      localStorage.setItem('Token', token);

      console.log(token);

      setLoading(false);
      toast.success('Successfully logged in');
      navigate('');
    } catch (error) {
      setLoading(false);
      toast.error(error.message || 'Signup failed');
    }
  };

  return (
    <Helmet title="signup">
      <section>
            {loading ? (
              <Col xxl="12" classNameName="text-center">
                <h5 classNameName="fw-bold">Loading...</h5>
              </Col>
            ) : (
              // Signup
              <div className="container-fluid d-flex">
                  <img src="/imgs/signup/Img.jpg" className="modal-img" alt="signup-img" />
                  <div className="container">
                    <div className="modal-content-signup">
                      <h3>Sign Up</h3>
                      <div className="social-signup-btn">
                        <a href="#">
                          <img src="/imgs/signup/Google.svg" className="me-3" alt="" />
                        </a>
                        <a href="#">
                          <img src="/imgs/signup/Facebook.svg" alt="" />
                        </a>
                      </div>
                      <p className="title2" id="signup-or">
                        Or, sign up with your email
                      </p>
                      <form>
                        {/* Full name */}
                        <div className="mb-3">
                          <label for="fullName" className="form-label label1">
                            Full name
                          </label>
                          <div className="input-with-icon">
                            <img src="/imgs/signup/user.svg" alt="fullName" className="leading-icon" />
                            <input
                              type="text"
                              placeholder="Enter your full name here"
                              className="form-control form-md-icon"
                              value={username}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        {/* Email */}
                        <div className="mb-3">
                          <label for="email" className="form-label label1">
                            Email
                          </label>
                          <div className="input-with-icon">
                            <img src="/imgs/signup/email.svg" alt="email" className="leading-icon" />
                            <input
                              type="text"
                              placeholder="Enter your email address" // Assuming username is equivalent to email in this context
                              className="form-control form-md-icon"
                              value={username}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        {/* Password */}
                        <div className="mb-3">
                          <label for="password" className="form-label label1">
                            Password
                          </label>
                          <div className="input-with-icon">
                            <img src="/imgs/signup/lock.svg" alt="password" className="leading-icon" />
                            <input
                              type="password"
                              className="form-control form-md-icon"
                              placeholder="•••••••••••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <img src="/imgs/signup/eye-open.svg" alt="password" className="trailing-icon" />
                          </div>
                        </div>
                      </form>
                      <button onClick={signupHandler} className="prim-btn btn-md signup-btn w-100">
                        SIGN IN
                      </button>
                      <p className="signup-link">
                        Not yet registered? <Link to="/signup">Sign Up</Link> now!
                      </p>
                    </div>
                  </div>
              </div>
              
            )}
          
        
      </section>
    </Helmet>
  );
};

export default Signup;
