"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparerUtils = exports.getLiteralTypeOrder = exports.getAstNodeTypeOrder = void 0;
const utils_1 = require("@typescript-eslint/utils");
const getAstNodeTypeOrder = (type) => {
    const order = [utils_1.AST_NODE_TYPES.Literal, utils_1.AST_NODE_TYPES.Identifier].indexOf(type);
    const END_OF_ORDER = 2;
    return order === -1 ? END_OF_ORDER : order;
};
exports.getAstNodeTypeOrder = getAstNodeTypeOrder;
const getLiteralTypeOrder = (type) => {
    const order = ['undefined', 'boolean', 'number', 'bigint', 'string'].indexOf(type);
    const END_OF_ORDER = 5;
    return order === -1 ? END_OF_ORDER : order;
};
exports.getLiteralTypeOrder = getLiteralTypeOrder;
const makeObjectComparer = ({ isReversed }) => {
    const comparer = (l, r) => {
        if (l.type === utils_1.AST_NODE_TYPES.Property && r.type === utils_1.AST_NODE_TYPES.Property) {
            if (l.key.type === utils_1.AST_NODE_TYPES.Literal && r.key.type === utils_1.AST_NODE_TYPES.Literal) {
                return l.key.value < r.key.value ? -1 : 1;
            }
            else if (l.key.type === utils_1.AST_NODE_TYPES.Identifier && r.key.type === utils_1.AST_NODE_TYPES.Identifier) {
                if (l.computed !== r.computed) {
                    return l.computed ? 1 : -1;
                }
                return l.key.name < r.key.name ? -1 : 1;
            }
            else {
                return (0, exports.getAstNodeTypeOrder)(l.key.type) - (0, exports.getAstNodeTypeOrder)(r.key.type);
            }
        }
        else {
            return 0;
        }
    };
    return isReversed ? (l, r) => -comparer(l, r) : comparer;
};
const makeArrayComparer = ({ isReversed }) => {
    const comparer = (l, r) => {
        if (l.type === utils_1.AST_NODE_TYPES.Literal && r.type === utils_1.AST_NODE_TYPES.Literal) {
            if (typeof l.value !== typeof r.value) {
                return (0, exports.getLiteralTypeOrder)(typeof l.value) - (0, exports.getLiteralTypeOrder)(typeof r.value);
            }
            else if (typeof l.value === 'number' && typeof r.value === 'number') {
                return l.value - r.value;
            }
            else if (typeof l.value === 'string' && typeof r.value === 'string') {
                return l.value < r.value ? -1 : 1;
            }
            else {
                return 0;
            }
        }
        else if (l.type === utils_1.AST_NODE_TYPES.Identifier && r.type === utils_1.AST_NODE_TYPES.Identifier) {
            return l.name < r.name ? -1 : 1;
        }
        else if (l.type !== r.type) {
            return (0, exports.getAstNodeTypeOrder)(l.type) - (0, exports.getAstNodeTypeOrder)(r.type);
        }
        else {
            return 0;
        }
    };
    return isReversed ? (l, r) => -comparer(l, r) : comparer;
};
exports.ComparerUtils = {
    makeObjectComparer,
    makeArrayComparer,
};
