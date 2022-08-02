"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sorted_keys_1 = __importDefault(require("./rules/sorted-keys"));
module.exports.rules = {
    'sorted-keys': sorted_keys_1.default,
};
