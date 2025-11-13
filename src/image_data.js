// image_data.js
// --- הגדרות נתונים ---

// 1. הגדרת שם קובץ השיר
export const SONG_FILENAME = 'FloresAmarillas.mp3';


// 2. מפת כיתובים: חובה להוסיף כאן את הכיתוב לכל קובץ!
// המפתח הוא שם הקובץ המלא (כולל סיומת), והערך הוא הכיתוב שיופיע מתחת לתמונה.
const CAPTION_MAP = {
    // *** תמונות דוגמה (שנה לשמות הקבצים שלך) ***
    'paris_2024.jpg': 'יום הולדת 2024 בפריז',
    'getaway_weekend.jpg': 'סופ"ש ראשון שלנו יחד',
    'smile.jpg': 'החיוך המיליון דולר שלך!',
    'sunset.jpg': 'נוף השקיעה שלנו בחוף',
    'image1.jpg': "PARK GUELL",

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