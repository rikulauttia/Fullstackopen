"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = exports.isDate = void 0;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
exports.isString = isString;
