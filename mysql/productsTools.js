import pool from "./index.js";

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