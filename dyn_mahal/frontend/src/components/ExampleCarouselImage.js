import React from 'react';
import PropTypes from 'prop-types';

function ExampleCarouselImage({ text, imageSrc }) {
  return (
    <div className="example-carousel-image">
      {/* Image Section */}
      <img
        src={imageSrc}
        alt={text}
        className="d-block w-100"
        style={{ objectFit: 'cover', height: '400px' }} // Adjust height if needed
      />
      {/* Optional Text/Overlay */}
      {text && (
        <div
          className="carousel-overlay"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            color: 'white',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          }}
        >
          <h5>{text}</h5>
        </div>
      )}
    </div>
  );
}

// Define PropTypes
ExampleCarouselImage.propTypes = {
  text: PropTypes.string, // Text to overlay on the image
  imageSrc: PropTypes.string.isRequired, // Image source URL
};

export default ExampleCarouselImage;
