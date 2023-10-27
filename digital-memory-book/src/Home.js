import React, { Component } from 'react';
import image1 from './Stock_photos/family lake.jpeg';
import image2 from './Stock_photos/family sunset.jpg';
import image3 from './Stock_photos/family.jpg';
import image4 from './Stock_photos/family2.jpeg';
import image5 from './Stock_photos/familypark.jpg';
import image6 from './Stock_photos/park.jpg';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        { id: 1, src: image1, alt: 'Image 1', description: "Our beloved daughter's first time at the lake" },
        { id: 2, src: image4, alt: 'Image 2', description: "Family time is so precious, I love that we can document this!" },
        { id: 3, src: image2, alt: 'Image 3', description: "Woo hoo!!! We love going to the beach all the time!" },
        { id: 4, src: image5, alt: 'Image 4', description: "The park is such a wonderful place to go with family!" },
        { id: 5, src: image3, alt: 'Image 5', description: "What a beautiful view! What a way to end the day!" },
        { id: 6, src: image6, alt: 'Image 6', description: "Waiting to watch a movie" },
        // Add more images as needed
      ],
      selectedImage: null,
      hoveredImage: null, // Add hoveredImage to state
    };
  }

  handleImageClick = (image) => {
    this.setState({ selectedImage: image });
  };

  handleMouseEnter = (image) => {
    this.setState({ hoveredImage: image });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredImage: null });
  };

  render() {
    return (
      <div className="page-container">
        <div className="image-grid">
          {this.state.images.map((image) => (
            <div
              key={image.id}
              className="image-container"
              onMouseEnter={() => this.handleMouseEnter(image)}
              onMouseLeave={this.handleMouseLeave}
            >
              <img
                src={image.src}
                alt={image.alt}
                onClick={() => this.handleImageClick(image)}
                className="thumbnail"
              />
              {this.state.hoveredImage === image && (
                <div className="image-description">
                  {image.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
