import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function BookingDetails() {
  const [bookingData, setBookingData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:3900/api/booking/view-booking', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setBookingData(response.data.data);
        setStatusData(response.data.data.map((booking) => ({
          rejected: booking.status === 'rejected',
          approved: booking.status === 'approved' ,
          deliveryDate: calculateDeliveryDate(booking.bookingdate)
        })));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [token]);
  

  const handleReject = (bookingId, index) => {
    axios.put(`http://localhost:3900/api/booking/reject-booking/${bookingId}`)
      .then((response) => {
        const newStatusData = [...statusData];
        newStatusData[index] = { ...newStatusData[index], rejected: true };
        setStatusData(newStatusData);
      });
  };

  const handleAccept = (bookingId, index) => {
    axios.put(`http://localhost:3900/api/booking/approve-booking/${bookingId}`)
      .then((response) => {
        const newStatusData = [...statusData];
        newStatusData[index] = { ...newStatusData[index], approved: true , deliveryDate: calculateDeliveryDate(bookingData[index].bookingdate) };
        setStatusData(newStatusData);
      });
  };
  const calculateDeliveryDate = (bookingDate) => {
    const deliveryDate = new Date(bookingDate);
    deliveryDate.setMonth(deliveryDate.getMonth() + 1);
    return deliveryDate.toLocaleDateString(); 
  };

  return (
    <center>
      <div className="booking-details" style={{ maxWidth: '100%', margin: '20px', height: 'auto', overflowX: 'auto' }}>
        <h2>Booking Details</h2>
        <div className="table-responsive">
          <Table  striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Bike Name</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th>Delivery Date</th>
              </tr>
            </thead>
            <tbody>
              {bookingData.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.bikename}</td>
                  <td>{booking.bookingdate}</td>
                  {statusData[index].rejected ? (
                    <td>Rejected</td>
                  ) : statusData[index].approved ? (
                    <>
                    <td>Approved</td>
                    <td>{statusData[index].deliveryDate}</td>
                  </>                  ) : (
                    <>
                      <button className='btn btn-danger' onClick={() => handleReject(booking._id, index)}>Reject</button>
                      <button className='btn btn-success' onClick={() => handleAccept(booking._id, index)}>Approve</button>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </center>
  );
}

export default BookingDetails;
