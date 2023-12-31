import getAll from "./products/getAll.js";
import getSpecific from "./products/getSpecific.js";
import getSpecificProductSizes from "./products/getSpecificProductSizes.js";
import putName from "./products/putName.js";

/*
    Користуючись коротким синтаксисом заповняємо наш об'єкт,
    аби пізніше було зручніше використовувати кожен з контролерів.

    Самі контролери були винесені в окрему теку,
    аби мати більш декомпозований та зручний код
*/
const productsController = {
    getAll,
    getSpecific,
    getSpecificProductSizes,
    putName
};

export default productsController;
