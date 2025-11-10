import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './App.css'; 

function App() {
  // ⚠️ ודא ששם הקובץ תואם לקובץ בתיקיית public
  const songFileName = 'FloresAmarillas.mp3'; 

  // ⚠️ עדכן את נתיבי התמונות שלך (מתוך public או Cloudinary)
  const images = [
    { src: '/image1.jpg', alt: 'יום הולדת 2024 בפריז' },
    { src: '/image2.jpg', alt: 'הסופ"ש הראשון שלנו יחד' },
    { src: '/image3.jpg', alt: 'חיוך של מיליון דולר!' },
    // הוסף תמונות נוספות כאן
  ];

  return (
    <div className='surprise-page'>

      {/* כותרת ומסר אישי */}
      <header className="page-header">
        <h1>פרחים צהובים בשביל האהבה שלי, גבי 💜</h1>
        <p>לרגל יום ההולדת, זוכרת ש... זה תמיד יום שמח.</p>
      </header>

      {/* נגן האודיו */}
      <div className="audio-player-container">
        <ReactAudioPlayer
          src={`/${songFileName}`} // הנתיב מפנה לתיקיית public
          autoPlay // מנסה לנגן אוטומטית
          controls // כפתורי שליטה
          loop // מנגן בלולאה
        />
      </div>

      {/* גלריית התמונות הרספונסיבית */}
      <main className='image-gallery'>
        {images.map((img, index) => (
          <div key={index} className='image-item'>
            <img src={img.src} alt={img.alt} className='responsive-img'/>
            <p>{img.alt}</p>
          </div>
        ))}
      </main>

      {/* פוטר */}
      <footer>
        <p>אוהב אותך לנצח נצחים, נדב.</p>
      </footer>
    </div>
  );
}

export default App;