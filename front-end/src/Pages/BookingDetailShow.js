import React from 'react'
import BookingDetails from '../Components/Bookingdetails/BookingDetails';
import { Link } from 'react-router-dom';


function BookingDetailShow() {
    const token = sessionStorage.getItem('token');
if(token){
    return(
        <main className="main-content">
      <BookingDetails/>
       </main>
    )
}   
  return (
    <div className="app">
    <main className="main-content">
      <center>
        <p>You need to be logged in to view bikes.</p>
        
          <Link to='/Login' className='nav-link text-center btn btn-success' style={{width:"100px" , height:"50px"}}>
          <h6>Login</h6>
          </Link>
      </center>
    </main>
  </div>
  )
}

export default BookingDetailShow