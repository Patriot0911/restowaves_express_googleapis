import { config  as envConfig } from 'dotenv';
import { getAllSheetsInfo } from './googleSheets.js';
import {
    deleteEmptyMySQLProductSizes,
    insertMySQLProduct,
    insertMySQLProductModel,
    insertMySQLProductSizes,
    selectMySQLProductNotById
} from '../mysql/productsTools.js';
import { parseModelRows } from './rowsTools.js';

envConfig();

const minsToMiliSec = (minutes) => minutes * 60 * 1000;

const getUpdateInterval = () => setInterval(updateHandler, minsToMiliSec(process.env.UpdateInterval));

const updateHandler = async () => {
    const sheetsList = await getAllSheetsInfo();
    if(sheetsList.length < 1)
        return;
    for(let i = 0; i < sheetsList.length; i++) {
        const modelName = sheetsList[i].title;
        const rows = sheetsList[i].values;

        const modelData = await insertMySQLProductModel(modelName);

        const parsedTabel = parseModelRows(rows);
        if(!parsedTabel)
            continue;

        for(let k = 0; k < parsedTabel.length; k++) {
            const productInfo = await selectMySQLProductNotById(modelData.id, parsedTabel[k].productSpecId);
            let id = productInfo ? productInfo.id : undefined;
            if(!productInfo) {
                const insertedProduct = await insertMySQLProduct({
                    productModelId: modelData.id,
                    ...parsedTabel[k]
                });
                id = insertedProduct.insertId
            } else {
                await deleteEmptyMySQLProductSizes(productInfo.id, parsedTabel[k].sizes);
            };
            await insertMySQLProductSizes(id, parsedTabel[k].sizes);
        };
    };
};

const startProcedure = async () => {
    await updateHandler();
    return getUpdateInterval();
};

export default startProcedure;
