"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sort_annotation_1 = __importDefault(require("./rules/sort-annotation"));
const sort_keys_annotation_1 = __importDefault(require("./rules/sort-keys-annotation"));
module.exports.rules = {
    sort: sort_annotation_1.default,
    'sort-keys': sort_keys_annotation_1.default,
};
