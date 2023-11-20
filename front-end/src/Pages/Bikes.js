import React from "react";

import BikeCard from '../Components/BikeCard/BikeCard';
import { Link } from 'react-router-dom';

const Bikes = () => {
  const token = sessionStorage.getItem('token');
 


  if (token) {
    return (
      <div className="app">
        <main className="main-content">
          <BikeCard />
        </main>
      </div>
    );
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
  );
};

export default Bikes;
