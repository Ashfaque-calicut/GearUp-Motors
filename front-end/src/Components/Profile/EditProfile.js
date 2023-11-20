import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const EditProfile = () => {
  const token=sessionStorage.getItem("token")
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        // username:"",
        name: "",
        email: "",
        phone: "",
       
      });
      useEffect(() => {
        axios
          .get(`http://localhost:3900/api/bike/profile`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          .then((response) => {
            console.log(response);
            setProduct(response.data.data);
           
          });
      }, [token]);
      const inputChange = (event) => {
        const { name, value } = event.target;
        setProduct({
          ...product,
          [name]: value,
        });
        console.log(product);
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .put(`http://localhost:3900/api/bike/update-profile/${product._id}`,product,
          )

          .then(() => {
            navigate("/profile");
          });
      
  };

  return (
    <div>
      <center>
        <Card style={{ width: '20rem', height: '500px' }}>
          <Card.Body>
            <Card.Title>Edit Profile</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={inputChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={product.email}
                  onChange={inputChange}
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={product.phone}
                  onChange={inputChange}
                />
              </Form.Group>
              <Button type="submit" variant="primary" onClick={(event)=>{handleSubmit(event)}}>
              save
              </Button>
            </Form>
      
          </Card.Body>
        </Card>
      </center>
    </div>
  );
};

export default EditProfile;
