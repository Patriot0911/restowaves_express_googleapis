import { getAllSheetsInfo } from '../../helpers/googleSheets.js';

const getAll = async (req, res ) => {
    res.send(await getAllSheetsInfo());
};

export default getAll;
