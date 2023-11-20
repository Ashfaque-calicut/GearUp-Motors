import React from 'react';
import './Banner.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image12 from '../../assets/images/image12.png'; // Import your bike images
import image14 from '../../assets/images/image14.jpg';
import image13 from '../../assets/images/image13.jpg';
import image11 from '../../assets/images/image11.jpg';
import bgimage from '../../assets/images/bgimage.jpg'; // Import your new banner image
import BikeCard from '../BikeCard/BikeCard';

const Banner = () => {
  return (
    <>
      <section className="banner">
        <div className="banner-image-container">
          <img src={bgimage} alt="Banner" className="banner-image" />
        </div>
        <div className="banner-content">
          <h2>Welcome to our Bike Showroom</h2>
          <h1> Gear<span style={{ color: "red" }}>Up</span> Motors</h1>
          <p>Explore a wide range of bikes for every type of rider.</p>
        </div>
      </section>
      <h1> Wel<span style={{ color: "red" }}>COME</span> </h1>
      <BikeCard/>
      <Carousel showArrows={true} showThumbs={false} autoPlay={true} interval={1000} infiniteLoop>
        <div>
          <img src={image12} alt="Image 1" className="carousel-image" />
        </div>
        <div>
          <img src={image13} alt="Image 2" className="carousel-image" />
        </div>
        <div>
          <img src={image14} alt="Image 4" className="carousel-image" />
        </div>
        <div>
          <img src={image11} alt="Image 11" className="carousel-image" />
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
