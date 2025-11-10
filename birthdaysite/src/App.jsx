import React, { useState } from 'react'; // Removed 'useRef'
import ReactAudioPlayer from 'react-audio-player';
import './App.css'; 

// Example images - REPLACE THESE WITH YOUR ACTUAL CLOUDINARY URLS!
const IMAGE_LIST = [
  { src: '/images/image1.jpg', alt: 'Birthday 2024 in Paris' },
  { src: '/images/image2.jpg', alt: 'Our First Weekend Getaway' },
  { src: '/images/image3.jpg', alt: 'A Million Dollar Smile!' },
  { src: '/images/image4.jpg', alt: 'Our Sunset View' },
];

// Icon Paths (Assuming they are in public/icons folder)
const LEFT_ICON = '/icons/lefticon.png';
const RIGHT_ICON = '/icons/righticon.png';
const SONG_FILENAME = 'FloresAmarillas.mp3';

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = IMAGE_LIST[currentImageIndex];
  
  // Logic to navigate left (Previous)
  const goToPrevious = () => {
    const newIndex = currentImageIndex === 0 
      ? IMAGE_LIST.length - 1 
      : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  // Logic to navigate right (Next)
  const goToNext = () => {
    const newIndex = currentImageIndex === IMAGE_LIST.length - 1 
      ? 0 
      : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className='surprise-page'>
      
      <header className="page-header">
        <h1>Yellow Flowers for my Love, Gabi 💜</h1>
        <p>Happy Birthday! Remember... it's always a happy day.</p>
      </header>
      
      {/* Audio Player - Now includes 'controls' again for user interaction */}
      <div className="audio-player-container">
        <ReactAudioPlayer
          src={`/${SONG_FILENAME}`}
          autoPlay 
          controls // <-- Added controls back
          loop
        />
      </div>

      {/* Image box with navigation buttons */}
      <main className='gallery-container'>
          
          {/* Left Button with Icon */}
          <button onClick={goToPrevious} className='nav-button left-button' aria-label="Previous Image">
              <img src={LEFT_ICON} alt="Previous" className="nav-icon" />
          </button>
          
          {/* Main Image Display Box */}
          <div className='image-display-box'>
              <img 
                key={currentImageIndex}
                src={currentImage.src} 
                alt={currentImage.alt} 
                className='current-image'
              />
              <p className='image-caption'>{currentImage.alt}</p>
          </div>
          
          {/* Right Button with Icon */}
          <button onClick={goToNext} className='nav-button right-button' aria-label="Next Image">
              <img src={RIGHT_ICON} alt="Next" className="nav-icon" />
          </button>
          
      </main>

      <footer>
        <p>Forever Yours, Nadav.</p>
      </footer>
    </div>
  );
}

export default App;