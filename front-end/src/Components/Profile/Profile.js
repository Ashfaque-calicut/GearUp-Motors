import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Profile = () => {
  const token=sessionStorage.getItem('token')
 const[profile,setProfile]=useState([])



  useEffect(() => {
      axios.get(`http://localhost:3900/api/bike/profile`,{
       headers:{
        Authorization:`Bearer ${token}`
       }
      }).then((response)=>{
        console.log(response);
        setProfile(response.data.data)
        console.log(response.data.data)
      }) 
    },[token])

        

  return (
    <div>
      <center>
      
        <Card style={{ width: '20rem', height: '600px' }}>
          <Card.Body>
          <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" />
            <Card.Title>{profile.username}</Card.Title>
            <Card.Text>Name:{profile.name}</Card.Text>
            <Card.Text>Email: {profile.email}</Card.Text>
            <Card.Text>Phone:{profile.phone}</Card.Text>
            <Button variant="primary">
            <Link to={`/EditProfile/${profile._id}`} className="nav-link">
 
              Edit
              </Link>
              </Button>
          </Card.Body>
        </Card>
        </center>
    
    </div>
  );
};

export default Profile;
