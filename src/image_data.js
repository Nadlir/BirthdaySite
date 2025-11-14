// image_data.js
// --- הגדרות נתונים ---

// 1. הגדרת שם קובץ השיר
export const SONG_FILENAME = 'FloresAmarillas.mp3';


// 2. מפת כיתובים: חובה להוסיף כאן את הכיתוב לכל קובץ!
// המפתח הוא שם הקובץ המלא (כולל סיומת), והערך הוא הכיתוב שיופיע מתחת לתמונה.
const CAPTION_MAP = {
    // *** תמונות דוגמה (שנה לשמות הקבצים שלך) ***
    'image1.jpg': "HAPPY BIRTHDAY MI GABI",
    'image2.jpg': "PArrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr GUELL",
    'image3.jpg': "PARK GUELL",
    'image4.jpg': "PARK GUELL",
    'image5.jpg': "PARK GUELL",
    'image6.jpg': "PArrrrrrrrrrrrrrrrrrrr GUELL",
    'image7.jpg': "PARK GUELL",

    // *** הוסף את כל התמונות שלך כאן (שם קובץ: כיתוב) ***
    // 'my_new_image.jpg': 'זה הכיתוב שאני רוצה להציג',
    // 'another_photo.png': 'עוד רגע מדהים שלנו',
};


// 3. יצירת רשימת התמונות הסופית (אוטומטי)
// הפונקציה הזו יוצרת את הרשימה הנדרשת על ידי App.jsx
export const IMAGE_LIST = Object.keys(CAPTION_MAP).map(filename => ({
    // ה-SRC מצביע לנתיב הסטטי בתיקיית public/images
    src: `/images/${filename}`, 
    alt: CAPTION_MAP[filename]
}));