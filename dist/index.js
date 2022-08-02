"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sort_keys_1 = __importDefault(require("./rules/sort-keys"));
module.exports.rules = {
    'sort-keys': sort_keys_1.default,
};
