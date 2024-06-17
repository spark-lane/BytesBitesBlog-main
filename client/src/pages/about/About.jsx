import React from 'react';
import './about.css'; 

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h2 className="about-title">About Me</h2>
        <p className="about-text">
          Welcome to Blog Bites Blog, your go-to source for the latest in the world of technology. We're on a mission to simplify complex tech topics and keep you informed about the most exciting developments. Our team of tech enthusiasts is dedicated to delivering tech news, product reviews, how-tos, and insights to help you navigate the digital landscape. Join us on this tech journey, and together, we'll explore the future of innovation.
        </p>
        <p className="about-text">
          You can find the project's source code on our GitHub repository: 
          <a className="github-link" href="https://github.com/Dash-910/BytesBitesBlog" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
        </p>
      </div>
    </div>
  );
};

export default About;
