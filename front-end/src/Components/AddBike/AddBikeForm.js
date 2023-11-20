import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBikeForm.css'
import axios from 'axios'


function AddBikeForm() {
  const navigate = useNavigate();
  const [bikeFormData, setBikeFormData] = useState({
    name: '',
    description: '',
    price:'',
    image: '',
  });

  function handleInputChange(event) {
    const {name,value}=event.target
    setBikeFormData({...bikeFormData,[name]:value})
  }
  const handlePhoto = (e) => {
    setBikeFormData({...bikeFormData, image: e.target.files[0]});
    console.log(bikeFormData.image);
}

  function handleSubmit(event) {
 
    const formData=new FormData();
    formData.append('image',bikeFormData.image);
    formData.append('name',bikeFormData.name);
    formData.append('description',bikeFormData.description);
    formData.append('price',bikeFormData.price);
    event.preventDefault();



    // axios.post(`http://localhost:3900/api/bike/add-bike`,formData)
    axios.post(`https://gearup-motors.onrender.com/api/bike/add-bike`,formData)
  .then((response)=>{
    navigate('/Bike')
   } )}

  return (
    <div className="add-bike-form">
      <h2>Add a New Bike</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Bike Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={bikeFormData.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={bikeFormData.description}
          onChange={handleInputChange}
          required
        />
          <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={bikeFormData.price}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="image">Image </label>
        <input
          type="file"
          accept='.png,.jpg,.jpeg'
          id="image"
          name="image"
          onChange={handlePhoto}
          alt=" "
          required
        />
        <button type="submit">Add Bike</button>
      </form>
    </div>
  );
}

export default AddBikeForm;
