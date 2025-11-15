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
    background-color: #fce883; 
    color: #333;
    
    /* מרכוז ומניעת גלילה גלובלית */
    display: flex;
    justify-content: center; 
    align-items: center; 
    min-height: 100vh;
    overflow: hidden; 
}

/* -------------------------- MODAL STYLES -------------------------- */
.full-screen-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #6a0dad;
    color: white;
    z-index: 1000;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
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


/* Main Container: מחזיק את כל התוכן וגם את תמונת הרקע */
.surprise-page {
    margin: 0 auto;
    width: 100vw; 
    
    /* מאפייני גובה ותצוגה */
    height: 100vh; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; 
    
    padding: 0 20px; 
    box-sizing: border-box; 

    /* מונע התכווצות עקב תוכן צר */
    flex-shrink: 0; 
    
    /* הגדרות רקע דינמיות */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-image 0.7s ease-in-out; 

    position: relative; 
}

/* שכבה שקופה מעל הרקע כדי לשפר קריאות טקסט */
.surprise-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    pointer-events: none;
}


/* -------------------------- Header Wrapper and Audio Positioning -------------------------- */
.header-wrapper {
    width: 100%;
    padding: 20px 0;
    z-index: 10;
}

.page-header {
    text-align: center;
    width: 100%; 
    padding: 0;
    margin-bottom: 0; 
    box-sizing: border-box;
}


/* Audio Player - מיקום קבוע לחלון הדפדפן */
.audio-player-container {
    position: fixed; 
    top: 15px; 
    right: 15px;
    
    padding: 5px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 100;
    
    width: 250px; 
    margin: 0; 
}
.audio-player-container audio {
    width: 100%;
}


/* -------------------------- Gallery Container (ניווט בלבד) -------------------------- */
.gallery-container {
    flex-grow: 1; 
    display: flex; 
    justify-content: space-between;
    align-items: center;
    width: 100%; 
    margin: 5px 0; 
    padding: 0;
    box-sizing: border-box;
}


/* -------------------------- Navigation Buttons (Fixed) -------------------------- */
.nav-button {
    /* *** מיקום קבוע: מרכז אנכי *** */
    position: fixed; 
    top: 50%; 
    transform: translateY(-50%); 
    z-index: 100; 

    background-color: rgba(106, 13, 173, 0.6); 
    border: 3px solid white;
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
    /* *** התיקון הקריטי: משלב את ה-translate עם ה-scale המינימלי *** */
    transform: translateY(-50%) scale(1.25); 
}

.left-button {
    left: 20px; /* מיקום שמאל */
}

.right-button {
    right: 20px; /* מיקום ימין */
}

/* קלאס לכפתור חבוי אך תופס מקום (משמש רק את הכפתור השמאלי) */
.nav-button.hidden {
    visibility: hidden; 
    pointer-events: none; 
}

.nav-icon {
    width: 40px; 
    height: 40px;
    color: white;
}

/* -------------------------- Image Caption (מעל הפוטר) -------------------------- */
.image-caption {
    width: 100%;
    text-align: center;
    padding: 10px 0;
    margin-bottom: 20px;
    
    /* סגנון ברירת מחדל לטקסט קצר */
    font-family: "Akronim", cursive;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 130px; 
    color: rgb(243, 255, 20); 
    background-color: rgba(82, 82, 82, 0); 
    text-shadow: rgb(0, 0, 0) 2px 2px 2px; 
    
    z-index: 10;
    box-sizing: border-box;
}

/* *** סגנון מיוחד לטקסטים ארוכים (כופה גודל 15px) *** */
.image-caption.long-text {
    font-size: 15px !important; 
    text-transform: none; 
    font-weight: normal; 
    
    /* משפר הצגה של טקסט ארוך */
    max-width: 80%;
    margin: 0 auto 20px auto; 
    padding: 15px;
    background-color: rgba(84, 84, 84, 0.8); 
}

/* -------------------------- Footer - רכיב זה הוסר -------------------------- */


/* -------------------------- Mobile Responsiveness -------------------------- */
@media (max-width: 768px) {
    
    .surprise-page {
        padding: 10px;
    }
    
    .image-caption {
        font-size: 50px;
    }

    .image-caption.long-text {
        font-size: 12px !important;
        max-width: 95%;
        padding: 10px;
    }

    .gallery-container {
        flex-grow: 0; 
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        padding: 0;
    }
    
    /* מזיז את הכפתורים למובייל */
    .nav-button {
        position: fixed; /* נשאר קבוע */
        height: 50px; 
        width: 50px; 
        
        top: auto; 
        bottom: 20px; /* מופיעים בחלק התחתון של המסך */
        transform: none;
    }
    
    .left-button {
        left: 20px;
    }
    
    .right-button {
        right: 20px;
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
  const [showModal, setShowModal] = useState(true); 
  const audioRef = useRef(null);
  
  // בדיקה לוודא שהרשימה לא ריקה
  if (IMAGE_LIST.length === 0) {
    return (
        <div className='surprise-page' style={{backgroundColor: '#fce883', justifyContent: 'center'}}>
             <header className="page-header">
                <h1 style={{color: '#6a0dad'}}>⚠️ אנא הוסף תמונות בקובץ image_data.js</h1>
            </header>
        </div>
    );
  }

  const currentImage = IMAGE_LIST[currentImageIndex];


  // *** פונקציה חדשה: מחלצת גודל טקסט וטקסט נקי ***
  const getCaptionData = () => {
    if (!currentImage || !currentImage.alt || currentImage.alt.length < 3) {
      return { size: 30, text: currentImage ? currentImage.alt : 'NO CAPTION' }; // ברירת מחדל 30px
    }
    
    // חילוץ 3 התווים הראשונים
    const sizeString = currentImage.alt.substring(0, 3); 
    const size = parseInt(sizeString, 10);
    
    // חילוץ הכיתוב הנקי
    const text = currentImage.alt.substring(3);
    
    return { size, text };
  };

  const { size, text } = getCaptionData(); // חילוץ הנתונים

  // *** פונקציה מעודכנת: בודקת אם הטקסט מתחיל באות גדולה (לוגיקה משלימה) ***
  const isLongText = () => {
    // טקסט ארוך/קטן מוגדר אם הפונט קטן מ-50px 
    return size < 50; 
  };


  // Logic to navigate left (Previous) - לוגיקה לעצירה בתמונה הראשונה
  const goToPrevious = () => {
    const newIndex = currentImageIndex === 0 
      ? 0 // עוצר
      : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  // Logic to navigate right (Next) - לולאה (Loop)
  const goToNext = () => {
    const newIndex = currentImageIndex === IMAGE_LIST.length - 1 
      ? 0 // חוזר להתחלה
      : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  // פונקציה שמטפלת בלחיצה על המודאל
  const handleModalClick = () => {
    setShowModal(false);
    
    if (audioRef.current) {
        audioRef.current.volume = 0.1; // משתמש בווליום המועדף (0.1)
        audioRef.current.play().catch(error => {
            console.log("Audio playback failed after interaction:", error);
        });
    }
  };


  // Inject CSS styles into the DOM
  useEffect(() => {
    // הזרקת פונט Akronim
    const fontImport = document.createElement('link');
    fontImport.href = 'https://fonts.googleapis.com/css?family=Akronim';
    fontImport.rel = 'stylesheet';
    document.head.appendChild(fontImport);
    
    // הזרקת סגנונות CSS
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);
    return () => {
      // הסרת אלמנטים בניקוי
      document.head.removeChild(styleElement);
      document.head.removeChild(fontImport);
    };
  }, []);

  // הגדרת תמונת הרקע הדינמית
  const pageStyle = {
    backgroundImage: showModal ? 'none' : `url(${currentImage.src})`,
    backgroundColor: showModal ? '#fce883' : 'transparent', // צבע ברירת מחדל אם הרקע נכשל
  };


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

      {/* Audio Player - מיקום קבוע */}
      <div className="audio-player-container">
          <audio 
            ref={audioRef}
            src={`/${SONG_FILENAME}`}
            controls 
            loop
            preload="auto"
          />
      </div>

      {/* Left Button - מיקום קבוע (Fixed) */}
      {currentImageIndex !== 0 && (
          <button 
              onClick={goToPrevious} 
              className={`nav-button left-button ${currentImageIndex === 0 ? 'hidden' : ''}`}
              aria-label="Previous Image"
              disabled={currentImageIndex === 0}
          >
              <LeftArrowIcon />
          </button>
      )}

      {/* Right Button - מיקום קבוע (Fixed) */}
      <button 
          onClick={goToNext} 
          className={`nav-button right-button`}
          aria-label="Next Image"
      >
          <RightArrowIcon />
      </button>


      <div className='surprise-page' style={pageStyle}>
        
        <div className="header-wrapper">
            <header className="page-header">
            </header>
        </div>
            
        {/* Image box with navigation buttons - עכשיו משמש רק לריווח */}
        <main className='gallery-container'>
            
            {/* הכפתורים הוסרו מכאן */}
            
        </main>
        
        {/* כיתוב התמונה מופיע עכשיו מעוצב ומלא רוחב */}
        <p 
          className={`image-caption ${isLongText() ? 'long-text' : ''}`}
          style={{ fontSize: `${size}px` }} 
        >
          {text}
        </p>
      </div>
    </>
  );
}

export default App;