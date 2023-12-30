import { config  as envConfig } from 'dotenv';
import { getAllSheetsInfo } from './googleSheets.js';
import { insertMySQLProductModel } from '../mysql/fillTables.js';

envConfig();

const minsTomSec = (minutes) => minutes * 60 * 60;

const getUpdateInterval = () => setInterval(updateHandler, minsTomSec(process.env.UpdateInterval));

const updateHandler = async () => {
    const sheetsList = await getAllSheetsInfo();
    if(sheetsList.length < 1)
        return;
    for(let i = 0; i < sheetsList.length; i++) {
        await insertMySQLProductModel(sheetsList[i].title);
        console.log(sheetsList[i].values);
    }
};

const startProcedure = async () => {
    await updateHandler();
    return getUpdateInterval();
};

export default startProcedure;
