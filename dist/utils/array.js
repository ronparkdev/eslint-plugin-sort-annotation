"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtils = void 0;
const zip2 = (array1, array2) => {
    if (array1.length !== array2.length) {
        throw new Error('No matched array length');
    }
    return array1.map((item1, offset) => {
        const item2 = array2[offset];
        return [item1, item2];
    });
};
exports.ArrayUtils = {
    zip2,
};
