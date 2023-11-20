import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditBikeForm.css";


function EditBikeForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bike, setBike] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    axios
      // .get(`http://localhost:3900/api/bike/singlebike-bike/${id}`)
      .get(`https://gearup-motors.onrender.com/api/bike/singlebike-bike/${id}`)

      .then((response) => {
        console.log("Response:", response.data.data);
        setBike(response.data.data);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, [id]);

  const inputChange = (event) => {
    const { name, value } = event.target;
    setBike({ ...bike, [name]: value });
  };

  const handleImageChange = (event) => {
    setBike({ ...bike, image: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", bike.image);
    formData.append("name", bike.name);
    formData.append("description", bike.description);
    formData.append("price", bike.price);

    axios
      // .put(`http://localhost:3900/api/bike/update-bike/${id}`, formData)
      .put(`https://gearup-motors.onrender.com/api/bike/update-bike/${id}`, formData)

      .then((response) => {
        navigate("/Bike");
      });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Edit Bike Details</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Bike Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={bike.name}
                onChange={inputChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={bike.description}
                onChange={inputChange}
                required
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={bike.price}
                onChange={inputChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                required
                className="form-control"
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBikeForm;
