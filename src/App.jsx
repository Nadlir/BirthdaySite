import React, { useState, useEffect, useRef } from 'react';
import { IMAGE_LIST, SONG_FILENAME } from './image_data.js'; // ייבוא נתונים מקובץ נפרד

// קוד CSS מלא
const styles = `
/* Global Reset and Layout */
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #fce883; /* Soft yellow */
    color: #333;
    
    /* התיקון למרכוז מלא ומניעת גלילה גלובלית */
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    min-height: 100vh;
    overflow: hidden; /* מונע גלילה אנכית בדף כולו */
}

/* -------------------------- MODAL STYLES -------------------------- */
.full-screen-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #6a0dad; /* רקע סגול מלא */
    color: white;
    z-index: 1000;
    
    display: flex;
    flex-direction: column;
    justify-content: center; /* ממורכז אנכית */
    align-items: center; /* ממורכז אופקית */
    text-align: center;
    cursor: pointer;
    transition: opacity 0.5s ease;
}

.modal-content h1 {
    font-size: clamp(2.5em, 8vw, 6em);
    margin-bottom: 20px;
}

.modal-content p {
    font-size: clamp(1em, 2vw, 1.5em);
    font-weight: 300;
    opacity: 0.8;
}
/* ------------------------------------------------------------------- */


/* Main Container: Uses Flexbox to space content (Header/Audio, Gallery, Footer) */
.surprise-page {
    max-width: 1200px; 
    margin: 0 auto;
    
    height: 100vh; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; 
    
    padding: 0 10px; 
    box-sizing: border-box; 
}

/* Header, Audio, and Footer Styling */
.page-header, 
.audio-player-container, 
footer {
    text-align: center;
    width: 90%; 
    max-width: 600px;
    margin-bottom: 5px; 
}

.page-header {
    margin-top: 20px;
    margin-bottom: 5px; 
}

.page-header h1 {
    color: #6a0dad; /* Purple */
    font-size: clamp(1.8em, 4vw, 3em);
    margin: 0;
}

/* Audio Player - שימוש ב-audio tag מובנה במקום חבילה חיצונית */
.audio-player-container {
    margin-bottom: 15px; 
    padding: 10px;
    background: #ffe5b4; 
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    max-width: 450px;
}
.audio-player-container audio {
    width: 100%;
    min-width: 280px;
}


/* -------------------------- Gallery Container (Main Focus) -------------------------- */
.gallery-container {
    flex-grow: 1; 
    display: flex; 
    justify-content: center;
    align-items: center;
    width: 95%;
    max-width: 1000px;
    margin: 5px 0; 
}

/* Main Image Display Box */
.image-display-box {
    width: 80%; 
    max-width: 700px;
    height: 100%; 
    min-height: 200px; 
    margin: 0 15px; 
    background-color: white;
    border: 6px solid #6a0dad; 
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
}

.current-image {
    width: 100%;
    flex-grow: 1; 
    object-fit: contain;
    transition: opacity 0.5s ease-in-out;
    padding: 10px;
    box-sizing: border-box;
}

.image-caption {
    width: 100%;
    text-align: center;
    padding: 8px 0;
    margin: 0;
    background-color: #fce883;
    border-top: 1px solid #6a0dad;
    font-size: 1.1em;
    font-weight: bold;
    color: #6a0dad;
}

/* -------------------------- Navigation Buttons -------------------------- */
.nav-button {
    background-color: #6a0dad;
    border: none;
    padding: 0; 
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.3s ease, transform 0.2s ease;
    
    height: 70px; 
    width: 70px; 

    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-button:hover {
    background-color: #8a2be2;
    transform: scale(1.05);
}

.nav-icon {
    width: 40px; 
    height: 40px;
    color: white;
}

/* -------------------------- Footer -------------------------- */
footer {
    margin-top: 10px; 
    margin-bottom: 20px;
}


/* -------------------------- Mobile Responsiveness -------------------------- */
@media (max-width: 768px) {
    
    .surprise-page {
        padding: 10px 0;
    }
    
    .gallery-container {
        flex-direction: column;
        height: auto; 
    }
    
    .image-display-box {
        width: 98vw; 
        height: 50vh;
        margin: 10px 0;
        min-height: 250px;
    }
    
    .nav-button {
        width: 90vw; 
        height: auto;
        padding: 10px 15px;
        margin: 5px 0;
        border-radius: 12px;
        order: initial; 
    }
    
    .left-button {
        order: -1; 
    }
    
    .nav-icon {
        width: 30px; 
        height: 30px;
    }
}
`;

// Icon Components using inline SVG for better styling and centering
const LeftArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
        <path d="M15 18l-6-6 6-6"/>
    </svg>
);

const RightArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-icon">
        <path d="M9 18l6-6-6-6"/>
    </svg>
);


function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(true); // *** מצב חדש: מודאל מוצג בברירת מחדל ***
  const audioRef = useRef(null);
  
  // בדיקה לוודא שהרשימה לא ריקה
  if (IMAGE_LIST.length === 0) {
    return (
        <div className='surprise-page' style={{justifyContent: 'center'}}>
             <header className="page-header">
                <h1>Yellow Flowers for my Love, Gabi 💜</h1>
                <p>⚠️ אנא הוסף תמונות בקובץ image_data.js</p>
            </header>
        </div>
    );
  }

  const currentImage = IMAGE_LIST[currentImageIndex];


  // Logic to navigate left (Previous) .
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

  // פונקציה שמטפלת בלחיצה על המודאל
  const handleModalClick = () => {
    // 1. מסתיר את המודאל
    setShowModal(false);
    
    // 2. מפעיל את השיר (נחשב לאינטראקציה מאושרת על ידי הדפדפן)
    if (audioRef.current) {
        audioRef.current.play().catch(error => {
            console.log("Audio playback failed after interaction:", error);
            // אפשרות: להשאיר את הפקדים גלויים כדי שגבי תפעיל ידנית אם יש בעיה
        });
    }
  };


  // Inject CSS styles into the DOM
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);


  return (
    // הוספת המודאל כאלמנט תנאי ראשון
    <>
      {showModal && (
        <div className="full-screen-modal" onClick={handleModalClick}>
          <div className="modal-content">
            <h1>Happy Birthday! 🥳</h1>
            <p>Press anywhere for surprise</p>
          </div>
        </div>
      )}

      <div className='surprise-page'>
        
        <header className="page-header">
          <h1>Yellow Flowers for my Love, Gabi 💜</h1>
          <p>Happy Birthday! Remember... it's always a happy day.</p>
        </header>
        
        {/* Audio Player */}
        <div className="audio-player-container">
          <audio 
            ref={audioRef}
            src={`/${SONG_FILENAME}`}
            controls 
            loop
            preload="auto"
          />
        </div>

        {/* Image box with navigation buttons */}
        <main className='gallery-container'>
            
            {/* Left Button */}
            <button onClick={goToPrevious} className='nav-button left-button' aria-label="Previous Image">
                <LeftArrowIcon />
            </button>
            
            {/* Main Image Display Box */}
            <div key={currentImageIndex} className='image-display-box'>
                <img 
                  src={currentImage.src} 
                  alt={currentImage.alt} 
                  className='current-image'
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/700x500/6a0dad/ffffff?text=Image+Not+Found"; }}
                />
                <p className='image-caption'>{currentImage.alt}</p>
            </div>
            
            {/* Right Button */}
            <button onClick={goToNext} className='nav-button right-button' aria-label="Next Image">
                <RightArrowIcon />
            </button>
            
        </main>

        <footer>
          <p>Forever Yours, Nadav.</p>
        </footer>
      </div>
    </>
  );
}

export default App;