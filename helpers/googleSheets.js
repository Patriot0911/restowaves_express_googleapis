import { google } from 'googleapis';
import { config  as envConfig } from 'dotenv';

envConfig();

const spreadsheetId = process.env.SHEETSID;

const tableProps = {
    name:           'Імя',
    price:          'Ціна',
    productSpecId:  'Код товару',
    sizes:          'Розміри'
};

const auth = new google.auth.GoogleAuth({
    keyFile: 'googleAccount.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
});
const googleSheets = google.sheets({
    version: 'v4',
    auth
});

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