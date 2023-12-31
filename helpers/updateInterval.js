import { config  as envConfig } from 'dotenv';
import { getAllSheetsInfo } from './googleSheets.js';
import { insertMySQLProductModel } from '../mysql/fillTables.js';
import { parseModelRows } from './rowsTools.js';

envConfig();

const minsToMiliSec = (minutes) => minutes * 60 * 60;

const getUpdateInterval = () => setInterval(updateHandler, minsToMiliSec(process.env.UpdateInterval));

const updateHandler = async () => {
    const sheetsList = await getAllSheetsInfo();
    if(sheetsList.length < 1)
        return;
    for(let i = 0; i < sheetsList.length; i++) {
        const modelName = sheetsList[i].title;
        const rows = sheetsList[i].values;
        const parsedRes = parseModelRows(rows);
        if(!parsedRes)
            continue;
        console.log(parsedRes);
        await insertMySQLProductModel(modelName);
    }
};

const startProcedure = async () => {
    await updateHandler();
    return getUpdateInterval();
};

export default startProcedure;
