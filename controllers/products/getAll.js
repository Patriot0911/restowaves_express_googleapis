import { selectMySQLProducts } from '../../mysql/productsTools.js';

/*
    Контролер "getAll".
    Операція на отримання усіх, або ж фільтрацію усіх з певними розмірами - проводиться тут.
    sizes - задається як фільтр.
    Приклад: .../products?sizes=36,37
    У цьому випадку ми отримуємо усі продукти, які будуть мати розмір АБО 36 АБО 37.
    Аби отримати лише за єдиним критерієм - ми просто залишаємо 36,
    таким чином маємо наступне: .../products?sizes=36
*/
const getAll = async (req, res ) => {
    const { sizes } = req.query;
    const filter = sizes ? sizes.split(',').map(item => parseInt(item)) : undefined;
    const dbRes = await selectMySQLProducts(filter);
    if(!dbRes)
        return res.status(sizes ? 400 : 500).send({
            message: sizes ?
                'Invalid sizes provided' :
                'Something wnet wrong. Please try again later'
        });
    return res.status(200).send(dbRes);
};

export default getAll;
