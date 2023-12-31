import pool from "./index.js";

/*
    Отримати усі товари,
    або ж товари які мають певні розміри
*/
export const selectMySQLProducts = async (sizes) => {
    try {
        if(sizes) {
            if(sizes.includes(NaN))
                return;
            const [res] = await pool.query(`
                SELECT *
                FROM products.productinfo
                WHERE id IN (
                    SELECT productId
                    FROM products.producthassize
                    WHERE size IN (${sizes.join(', ')})
                );
            `);
            return res;
        };
        const [res] = await pool.query(`
            SELECT * FROM products.productInfo;
        `);
        return res;
    }catch(e) {
        return console.error(e);
    };
};
// Отримати товар по його Id
export const selectMySQLProductById = async (id) => {
    try {
        const [res] = await pool.query(`
            SELECT * FROM products.productInfo
            WHERE id = ${id};
        `);
        return res[0];
    }catch(e) {
        return console.error(e);
    };
};
// Отримати продукт за його загальними показниками (модель та спеціальний код товару)
export const selectMySQLProductNotById = async (modelId, productId) => {
    try {
        const [res] = await pool.query(`
            SELECT * FROM products.productInfo
            WHERE productModelId = ${modelId} AND productSpecId = ${productId};
        `);
        return res[0];
    }catch(e) {
        return console.error(e);
    };
};
// Отримати всі розміри для конкретного продукту
export const selectMySQLProductSizes = async (id) => {
    try {
        const [res] = await pool.query(`
            SELECT * FROM products.productHasSize
            WHERE productId = ${id};
        `);
        return res.map(item => item.size);
    }catch(e) {
        return console.error(e);
    };
};

// Оновити ім'я продукту
export const updateMySQLProductName = async (id, name) => {
    try {
        const [res] = await pool.query(`
            UPDATE products.productInfo
            SET name = \"${name}\"
            WHERE id = ${id};
        `);
        return res;
    }catch(e) {
        return console.error(e);
    };
};

// Створити новий продукт
export const insertMySQLProduct = async (props) => {
    const {
        name,
        price,
        productModelId,
        productSpecId
    } = props;
    try {
        const [res] = await pool.query(`
            INSERT INTO products.productInfo
            (productSpecId, name, price, productModelId)
            VALUES (
                ${productSpecId},
                \"${name}\",
                ${price},
                ${productModelId}
            );
        `);
        return res;
    }catch(e) {
        return console.error(e);
    };
};
// Створити нову модель
export const insertMySQLProductModel = async (modelName) => {
    try {
        await pool.query(`
            INSERT IGNORE INTO products.productmodels (modelName)
            VALUES ('${modelName}');
        `);
        const [res] = await pool.query(`
            SELECT * FROM products.productmodels
            WHERE modelName = '${modelName}';
        `);
        return res[0];
    }catch(e) {
        return console.error(e);
    };
};
// Додати розміри для продукту за його Id
export const insertMySQLProductSizes = async (productId, sizes) => {
    try {
        const [res] = await pool.query(`
            INSERT IGNORE INTO products.productHasSize
            (productId, size)
            VALUES
            (${productId}, ${sizes.join(`),\n(${productId}, `)});
        `);
        return res;
    }catch(e) {
        return console.error(e);
    };
};

// Видалити певні розміри товару, за його Id та самим розміром
export const deleteEmptyMySQLProductSizes = async (productId, sizes) => {
    try {
        const [res] = await pool.query(`
            DELETE FROM products.productHasSize
            WHERE productId = ${productId} AND size NOT IN (${sizes.join(', ')});
        `);
        return res;
    }catch(e) {
        return console.error(e);
    };
};