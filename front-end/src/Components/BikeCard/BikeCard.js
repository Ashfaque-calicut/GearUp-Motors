import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BikeCard.css";

const BikeCard = () => {
  const [bikee, setBikee] = useState([]);
  const token = sessionStorage.getItem("token");

  const [role, setRole] = useState();
  useEffect(() => {
    axios
      // .get("http://localhost:3900/api/bike/admin-auth", {
        .get("https://gearup-motors.onrender.com/api/bike/admin-auth",{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        console.log(response.data.data.userRole);
        setRole(response.data.data.userRole);
      });
  }, [token]);

  useEffect(() => {
    axios
      // .get("http://localhost:3900/api/bike/view-bike")
      .get("https://gearup-motors.onrender.com/api/bike/view-bike")
      .then((response) => {
        console.log(" Response:", response.data.data);
        setBikee(response.data.data);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, []);
  // const token=localStorage.getItem('token')

  // console.log(token);
  const cardStyle = {
    width: '400px',
    height: role === 2 ? '400px' : '600px', 
  }

  return (
    <div>
     <h2>Featured Bikes</h2>
     {role === 1 && (
            <Button variant="success">
              <Link to="/add-bike" className="text-white">
                Add Bike
              </Link>
            </Button>
          )}
      <div className="bike-card-container">
         
        {bikee.length > 0 ? (
          bikee.map((item) => (
            <div key={item._id} className="card-container">
              <Card className="card" style={cardStyle}>
                <Card.Img
                  variant="top"
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className="card-image"
                />
                <Card.Body className="card-body">
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>Price: {item.price}</Card.Text>
                 
                      <Button variant="warning">
                        <Link
                          to={`/SingleBike/${item._id}`}
                          className="nav-link"
                        >
                          View
                        </Link>
                      </Button>
                       {role === 1 && (
                    <>
                      <Button variant="primary">
                        <Link
                          to={`/EditBikeForm/${item._id}`}
                          className="nav-link"
                        >
                          Edit
                        </Link>
                      </Button>
                      <Button variant="danger" className="delete-button">
                        <Link to={`/delete/${item._id}`} className="nav-link">
                          Delete
                        </Link>
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No bikes found</p>
        )}
        
       
      
      </div>
      </div>
    
  );
};

export default BikeCard;
