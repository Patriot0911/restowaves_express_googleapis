import { google } from 'googleapis';
import { config  as envConfig } from 'dotenv';

envConfig();

// Аби пізніше можна було скористатися швидким заповненням об'єкту - зараз переписуємо значення з конфігу
const spreadsheetId = process.env.SHEETSID;

/*
    Назви усіх ключових колонок з нашої таблиці.
    Якщо ми захочемо їх змінити - то нам буде зручніше їх поправити тут, або ж в окремому конфігу
*/
const tableProps = {
    name:           'Імя',
    price:          'Ціна',
    productSpecId:  'Код товару',
    sizes:          'Розміри'
};

/*
    Створюємо новий об'єкт нашої Google авторизації.
    Він не є асинхроним, фактично, це є лише набір методів та ключів,
    які пізніше нам дають змогу створювати самі запити до документів
*/
const auth = new google.auth.GoogleAuth({
    keyFile: 'googleAccount.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
});
const googleSheets = google.sheets({
    version: 'v4',
    auth
});

// МетаДані документу дають змогу дізнатися його технічні властивості, але нас тут більше цікавлять саме аркуші
const getMetaData = () => googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
});
const getAllSheets = async () => {
    const metaData = await getMetaData();
    return metaData.data.sheets;
};
const getSheet = (sheetName) => googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: sheetName
});

// Отримуємо повну інформацію про конкретний аркуш
const getAllSheetsInfo = async () => {
    const sheets = await getAllSheets();
    if(sheets.length < 1)
        return [];
    const sheetsData = [];
    for(let i = 0; i < sheets.length; i++) {
        const sheetTitle = sheets[i].properties.title;
        const data = {
            title: sheetTitle,
            ...(await getSheet(sheetTitle)).data
        };
        sheetsData.push(data);
    }
    return sheetsData;
};

export {
    tableProps,
    getAllSheets,
    getSheet,
    getAllSheetsInfo
};