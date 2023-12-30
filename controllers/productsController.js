import getAll from "./products/getAll.js";
import getSpecific from "./products/getSpecific.js";
import put from "./products/put.js";

const productsController = {
    getAll: getAll,
    getSpecific: getSpecific,
    put: put
};

export default productsController;
