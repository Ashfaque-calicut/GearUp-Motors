import React, { useState } from 'react';
import './Register.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



const Register = () => {
  const navigate = useNavigate();

  const [details,setDetails]=useState({
    username:"",
 name:"",
 email:"",
 phone:"",
 password:"",
 role: "2" 
})

const [errors,setErrors]=useState({})



  const handleRegister = (e) => {
    e.preventDefault();
    const Validation = {};
    if (!details.username.trim()) {
      Validation.username = "Username is required";
    }

    if (!details.name.trim()) {
      Validation.name = "Name is required";
    }
    
    if (!details.email.trim()) {
      Validation.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      Validation.email = "Email is not valid";
    }
    
    if (!details.password.trim()) {
      Validation.password = "Password is required";
    } else if (details.password.length < 4) {
      Validation.password = "Password should be at least 4 characters";
    }
    
    if (!details.phone.trim()) {
      Validation.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(details.phone)) {
      Validation.phone = "Phone number is not valid (should be 10 digits)";
    }
    
    setErrors(Validation);
    
    if (Object.keys(Validation).length === 0) {
      alert("Form submitted successfully");
    }
    
    axios.post(`http://localhost:3900/api/register`, details)
    .then((response) => {
      navigate('/Login');
    })
 
  }

  const handleinputchange=(event)=>{
  const{name,value}=event.target
 setDetails({
  ...details,[name]:value
 })
 console.log(details)
  }

  return (
    <div className="register-container">
  <div className="register-form">
    <h2>Register</h2>
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          placeholder="Enter user Name"
          name="username"
          value={details.username}
          onChange={handleinputchange}
        />
        {errors.username && <span>{errors.username}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="name"> Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Full Name"
          name="name"
          value={details.name}
          onChange={handleinputchange}
        />
                {errors.name && <span>{errors.name}</span>}

      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={details.email}
          placeholder="Enter Email"
          onChange={handleinputchange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={details.phone}
          placeholder="Enter phone number"
          onChange={handleinputchange}
        />
                {errors.phone && <span>{errors.phone}</span>}

      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={details.password}
          onChange={handleinputchange}
        />
                {errors.password && <span>{errors.password}</span>}

      </div>
      <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={details.role}
              onChange={handleinputchange}
            >
              <option value="2">User</option>
              <option value="1">Admin</option>
            </select>
          </div>

      <button type="submit">Register</button>
    </form>
  </div>
</div>

  );
};

export default Register;
