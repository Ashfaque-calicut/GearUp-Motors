import React, { useState, useEffect } from "react";

import { Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import './SingleBike.css';
// import image from '../../assets/images/image7.png';

const SingleBike = () => {
    // const navigate = useNavigate();
    const [bikee, setBikee] = useState([]);
    const {id}=useParams()
    useEffect(() => {
    
        axios
          .get(`http://localhost:3900/api/bike/singlebike-bike/${id}`)
          .then((response) => {
            console.log(" Response:", response.data.data);
            setBikee(response.data.data);
          })
          .catch((error) => {
            console.error("Axios Error:", error);
          });
      }, [id]);




   return (
    <div className="bike-card-container">
   
          <Card className="card" style={{ width: '18rem' }} key={bikee.id}>
            <Card.Img variant="top" src={`/images/${bikee.image}`} alt={bikee.name} />
            <Card.Body>
              <Card.Title>{bikee.name}</Card.Title>
              <Card.Text>{bikee.description}</Card.Text>
              <Card.Text>Price: {bikee.price}</Card.Text>

             
                <Button variant="primary">
                <Link to={`/EditBikeForm/${bikee.id}`} className="nav-link">
                  Edit
                </Link>
              </Button>
              <Button variant="danger" >
              <Link to ={`/delete/${bikee.id}`} className="nav-link">Delete</Link>
              </Button>
              <Button variant="success">
                <Link to={'/Bike'} className='nav-link'></Link>
                submit
              </Button>
            </Card.Body>
          </Card>
        
      

    </div>
    
  );
};

export default SingleBike;
