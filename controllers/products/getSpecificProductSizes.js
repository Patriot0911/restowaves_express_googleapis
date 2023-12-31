import { selectMySQLProductSizes } from "../../mysql/productsTools.js";

/*
    Контролер "getSpecific".
    Головна мета - відокремити отримання розмірів від основної інформації про продукт.
    За стандартним шляхом це має виглядати як .../products/:id/sizes
    Приклад: .../products/1/sizes
    У відповідь ми отримуємо масив з усіма доступними розмірами
*/
const getSpecificProductSizes = async (req, res) => {
    const { id } = req.params;
    const dbRes = await selectMySQLProductSizes(id);
    if(!dbRes)
        return res.status(500).send({
            message: 'Accrued error with database query. Please Check that your product ID is valid.'
        });
    return res.status(200).send(dbRes);
};

export default getSpecificProductSizes;
