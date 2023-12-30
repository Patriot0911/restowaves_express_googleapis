import pool from "./index.js";

export const insertMySQLProductModel = (modelName) => pool.query(`
    INSERT IGNORE INTO products.productmodels (modelName)
    VALUES ('${modelName}');
`);