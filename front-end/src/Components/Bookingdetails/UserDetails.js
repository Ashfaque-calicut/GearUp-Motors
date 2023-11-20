import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardGroup } from 'react-bootstrap';
import './UserDetails.css';

const UserDetails = () => {
  const token = sessionStorage.getItem('token');
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    axios
      // .get(`http://localhost:3900/api/booking/user-booking`, {
        .get(`https://gearup-motors.onrender.com/api/booking/user-booking`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  // Function to add one month to a date
  const addOneMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate.toLocaleDateString();
  };

  return (
    <div>
      {userData.length > 0 ? (
        <div>
          <h2>Your Booking Data:</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {userData.map((booking) => (
              <CardGroup key={booking._id}>
                <Card className="custom-card">
                  <Card.Body>
                    <Card.Title>Name: {booking.name}</Card.Title>
                    <Card.Text>
                      <p>Email: {booking.email}</p>
                      <p>Phone: {booking.phone}</p>
                      <p>Bike Name: {booking.bikename}</p>
                      <p>Booking Date: {booking.bookingdate}</p>
                      <p>place:Status is approve you can come the calicut office in delivery date</p>
                      <button>Status: {booking.status}</button>
                      <p>Delivery Date: {addOneMonth(booking.deliveryDate)}</p>

                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            ))}
          </div>
        </div>
      ) : (
        <p>No booking data available.</p>
      )}
    </div>
  );
};

export default UserDetails;
