import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      // .post('http://localhost:3900/api/login', login)
      .post('https://gearup-motors.onrender.com/api/login', login)

      .then((response) => {
        console.log(response);
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('role', response.data.userRole);
       if(response.status===200){
        toast('Login successfully');
        setTimeout(()=>{
          navigate('/profile');
          window.location.reload();
        },1500);
      }
      })
      .catch((error) => {
        console.error(error);
        toast('Login Failed,user not found');
        toast('Register First');
        setTimeout(()=>{
          navigate('/Register')
        },1000)
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <>
    <ToastContainer
position="top-left"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={login.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={login.password}
              name="password"
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
    </>
  );
};

export default Login;