import { updateMySQLProductName } from "../../mysql/productsTools.js";

/*
    Контролер "putName".
    У завданні зазначено, що потрібно мати змогу змінювати ім'я існуючого продукту.
    Таким чином, це є реалізація цього пункту.
    Аби змінити його ім'я, ми маємо вказати у body prop. "name".
    body: {
        name: "New Name"
    }
    Для запиту також нам потрібний Id продукту, який ми задаємо у параметри
    За стандартних умов: .../products/:id
*/
const putName = async (req, res ) => {
    const { id } = req.params;
    const { name } = req.body;
    if(!id || !name)
        return res.status(400).send({
            message: 'Invalid id or name provided'
        });
    const dbRes = await updateMySQLProductName(id, name);
    if(!dbRes)
        return res.status(500).send({
            message: 'Accrued error with database query. Please Check that your product ID is valid.'
        });
    return res.status(200).send(dbRes);
};

export default putName;
