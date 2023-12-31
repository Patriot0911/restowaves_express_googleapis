import { selectMySQLProductById } from "../../mysql/productsTools.js";

/*
    Контролер "getSpecific".
    Головна мета - отримати продукт за його Id у базі даних.
    За стандартним шляхом це має виглядати як .../products/:id
    Приклад: .../products/1
    У відповідь ми отримуємо продукт з Id = 1
*/
const getSpecific = async (req, res ) => {
    const { id } = req.params;
    const dbRes = await selectMySQLProductById(id);
    if(!dbRes)
        return res.status(500).send({
            message: 'Accrued error with database query. Please Check that your product ID is valid..'
        });
    return res.status(200).send(dbRes);
};

export default getSpecific;
