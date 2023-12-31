import { tableProps } from "./googleSheets.js";

export const getRowIndexByProp = (rows, prop, index = 0) => {
    if(index === rows.length)
        return;
    if(rows[index] && rows[index][0].replace(/ /g, '') !== prop.replace(/ /g, ''))
        return getRowIndexByProp(rows, prop, index+1);
    return index;
};
export const getSizesArray = (rows) => {
    const rowIndex = getRowIndexByProp(rows, tableProps.sizes);
    if(!rowIndex)
        return;
    return rows.slice(rowIndex+1);
};
export const getPropRow = (rows, prop) => {
    const rowIndex = getRowIndexByProp(rows, prop);
    if(!rowIndex)
        return;
    return rows[rowIndex].slice(1);
};
export const getProductSizes = (sizes, count) => {
    const productsSizes = Array.from(
        {
            length: count
        },
        () => []
    );
    for(let i = 0; i < sizes.length; i++) {
        const strSize = sizes[i][0];
        for(let l = 1; l < sizes[i].length; l++) {
            if(sizes[i][l])
                productsSizes[l-1].push(strSize);
        };
    };
    return productsSizes;
};

export const getSeparatedRows = (rows) => {
    const keys = Object.keys(tableProps);
    const objKeys = keys.map((item) => [item, undefined]);
    const objMap = new Map(objKeys);
    const res = Object.fromEntries(objMap);
    for(let i = 0; i < keys.length; i++) {
        if(keys[i] === 'sizes') {
            res[keys[i]] = getSizesArray(rows);
            continue;
        };
        res[keys[i]] = getPropRow(rows, tableProps[keys[i]]);
    };
    return res;
};

/*
    Головна функція цього файлу.
    Вона має поєднювати усі декомпозовані частини,
    з метою перезібрати інформацію про нашу таблицю
    та надати її нам у зручнішій формі,
    яку пізніше ми вже можемо використати для запитів з DB
*/
export const parseModelRows = (rows) => {
    const separatedRows = getSeparatedRows(rows);
    if(Object.values(separatedRows).includes(undefined))
        throw 'Rows Error';
    const productsArray = [];
    const {
        sizes,
        name,
        price,
        productSpecId
    } = separatedRows;
    const productCount = name.length;
    const productSizes = getProductSizes(sizes, productCount);
    for(let i = 0; i < productCount; i++) {
        const data = {
            name:           name[i],
            productSpecId:  productSpecId[i],
            price:          price[i],
            sizes:          productSizes[i]
        };
        productsArray.push(data);
    }
    return productsArray;
};
