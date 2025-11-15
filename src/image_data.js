// image_data.js
// --- הגדרות נתונים ---

// 1. הגדרת שם קובץ השיר
export const SONG_FILENAME = 'FloresAmarillas.mp3';


// 2. מפת כיתובים: חובה להוסיף כאן את הכיתוב לכל קובץ!
// המפתח הוא שם הקובץ המלא (כולל סיומת), והערך הוא הכיתוב שיופיע מתחת לתמונה.
const CAPTION_MAP = {
    // *** תמונות דוגמה (שנה לשמות הקבצים שלך) ***
    'image1.jpg': "150HAPPY BIRTHDAY MI GABI",
    'image2.jpg': "150Stay exactly as you are",
    'image9.jpg': "078Keep chasing your dreams, you are doing amazing",
    'image4.jpg': "110I wish you all the best in the world",
    'image5.jpg': "150Enjoy everything you do",
    'image6.jpg': "123And celebrate life as you know",
    'image7.jpg': "080May we continue to have fun together despite the challenges",
    'image11.jpg': "080May we have many more good years together",
    'image3.jpg': "080To many more good experiences like we have had so far",
    'image10.jpg': "180I love you alot",
    'image8.jpg': "120From me, Nadav (Claro)💘",

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