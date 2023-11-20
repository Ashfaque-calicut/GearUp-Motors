import React from 'react';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './Pages/AboutUs';
import Contact1 from './Pages/Contact1';
import Bikes from './Pages/Bikes';
import Login from './Components/Lr/Login';
import Register from './Components/Lr/Register';
import AddBikeForm from './Components/AddBike/AddBikeForm';

import EditBikeForm from './Components/EditBike/EditBikeForm';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import BookingBike from './Components/Booking/BookingBike';
import SingleBike from './Components/singleBike/SingleBike';
import DeleteBike from './Components/deleteBike/DeleteBike';
import Profile from './Components/Profile/Profile';
import EditProfile from './Components/Profile/EditProfile';
import BookingDetailShow from './Pages/BookingDetailShow';
import UserDetails from './Components/Bookingdetails/UserDetails';


const App = () => {
  return (
    <div className="app">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/Bike" element={<Bikes />} />
          <Route path="/Booking" element={<BookingBike/>}/> 
          <Route path="/contact" element={<Contact1 />} /> 
          <Route path='/Login' element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path='/add-bike' element={<AddBikeForm/>}/>
          <Route path='/SingleBike/:id' element={<SingleBike/>}/>
          <Route path='/delete/:id' element={<DeleteBike/>}/>
          <Route path='/EditBikeForm/:id' element={<EditBikeForm/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/bookingDetails' element={<BookingDetailShow/>}></Route>
          <Route path='/EditProfile/:id' element={<EditProfile/>}/>
          <Route path="/user-booking" element={<UserDetails/>} />
          
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;


