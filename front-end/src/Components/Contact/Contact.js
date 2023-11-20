import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact">
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, feel free to get in touch with us.</p>
      <form className="contact-form">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" required />

        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" required />

        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" name="phone" required />

        <label htmlFor="email">Your Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="6" required></textarea>

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
