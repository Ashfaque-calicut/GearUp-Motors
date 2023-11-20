import React from 'react';
import './About.css';
import video1 from '../../assets/video/video1.mp4';

const About = () => {
  return (
    <section className="about">
      <div className="about-video-container">
        <video autoPlay muted loop className="about-video">
          <source src={video1} type="video/mp4" />
        </video>
      </div>
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          We are a passionate team of cyclists dedicated to promoting a healthy and active lifestyle through biking.
        </p>
        <p>
          At Bike Showroom, we believe that cycling is more than just a mode of transportation; it's an adventure, a sport,
          and a way to connect with the outdoors.
        </p>
        <p>
          Our showroom offers a wide range of bikes catering to every type of rider, from beginners to professionals.
          Whether you're into road biking, mountain biking, or urban commuting, we have the perfect bike for you.
        </p>
        <p>
          Our mission is to provide top-quality bikes, exceptional customer service, and a welcoming environment for all
          cyclists. We are committed to helping you find the right bike and accessories to make your biking experience truly
          enjoyable.
        </p>
        <p>
          Visit us today to experience the thrill of exploring the world on two wheels!
        </p>
      </div>
    </section>
  );
};

export default About;
