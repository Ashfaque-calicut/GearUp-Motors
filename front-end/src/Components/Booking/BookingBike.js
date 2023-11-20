import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function BookingForm() {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  // Initialize the state for form data
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bikename: '',
    bookingdate: '',
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setBookingFormData({ ...bookingFormData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post('http://localhost:3900/api/booking/add-booking', bookingFormData, config)
      .then((response) => {
        navigate('/user-booking'); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <Container className="booking-form" style={{ width: '900px', height: '600px' }}>
      <Form onSubmit={handleSubmit}>
      <h2>Booking Form</h2>
      <Form.Group controlId="bikename">
          <Form.Label>Bike Name:</Form.Label>
          <Form.Control
            type="text"
            name="bikename"
            value={bookingFormData.bikename}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={bookingFormData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={bookingFormData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={bookingFormData.phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

      

        <Form.Group controlId="bookingdate">
          <Form.Label>Booking Date:</Form.Label>
          <Form.Control
            type="date"
            name="bookingdate"
            value={bookingFormData.bookingdate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default BookingForm;
