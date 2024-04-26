"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparerUtils = exports.getLiteralTypeOrder = exports.getAstNodeTypeOrder = void 0;
const utils_1 = require("@typescript-eslint/utils");
const AST_NODE_TYPE_ORDERS = [utils_1.AST_NODE_TYPES.Literal, utils_1.AST_NODE_TYPES.Identifier, utils_1.AST_NODE_TYPES.MemberExpression];
const LITERAL_TYPE_ORDERS = ['boolean', 'number', 'bigint', 'string'];
const getAstNodeTypeOrder = (type) => AST_NODE_TYPE_ORDERS.includes(type) ? AST_NODE_TYPE_ORDERS.indexOf(type) : AST_NODE_TYPE_ORDERS.length;
exports.getAstNodeTypeOrder = getAstNodeTypeOrder;
const getLiteralTypeOrder = (type) => (LITERAL_TYPE_ORDERS.includes(type) ? LITERAL_TYPE_ORDERS.indexOf(type) : LITERAL_TYPE_ORDERS.length);
exports.getLiteralTypeOrder = getLiteralTypeOrder;
const compareProperty = (l, r) => {
    if (l.key.type === utils_1.AST_NODE_TYPES.Literal && r.key.type === utils_1.AST_NODE_TYPES.Literal) {
        const lKey = l.key.value;
        const rKey = r.key.value;
        return lKey === rKey ? 0 : lKey < rKey ? -1 : 1;
    }
    else if (l.key.type === utils_1.AST_NODE_TYPES.Identifier && r.key.type === utils_1.AST_NODE_TYPES.Identifier) {
        if (l.computed !== r.computed) {
            return l.computed ? 1 : -1;
        }
        const lKey = l.key.name;
        const rKey = r.key.name;
        return lKey === rKey ? 0 : lKey < rKey ? -1 : 1;
    }
    else if (l.key.type === utils_1.AST_NODE_TYPES.MemberExpression &&
        r.key.type === utils_1.AST_NODE_TYPES.MemberExpression &&
        l.key.object.type === utils_1.AST_NODE_TYPES.Identifier &&
        r.key.object.type === utils_1.AST_NODE_TYPES.Identifier &&
        (l.key.property.type === utils_1.AST_NODE_TYPES.Identifier || l.key.property.type === utils_1.AST_NODE_TYPES.PrivateIdentifier) &&
        (r.key.property.type === utils_1.AST_NODE_TYPES.Identifier || r.key.property.type === utils_1.AST_NODE_TYPES.PrivateIdentifier)) {
        if (l.computed !== r.computed) {
            return l.computed ? 1 : -1;
        }
        const lObject = l.key.object.name;
        const rObject = r.key.object.name;
        if (lObject !== rObject) {
            return lObject < rObject ? -1 : 1;
        }
        const lKey = l.key.property.name;
        const rKey = r.key.property.name;
        return lKey === rKey ? 0 : lKey < rKey ? -1 : 1;
    }
    else {
        const lOrder = (0, exports.getAstNodeTypeOrder)(l.key.type);
        const rOrder = (0, exports.getAstNodeTypeOrder)(r.key.type);
        return lOrder - rOrder;
    }
};
const makeObjectPropertyComparer = ({ isReversed }) => {
    const comparer = (l, r) => {
        if (l.type === utils_1.AST_NODE_TYPES.Property && r.type === utils_1.AST_NODE_TYPES.Property) {
            return compareProperty(l, r);
        }
        return 0;
    };
    return isReversed ? (l, r) => -comparer(l, r) : comparer;
};
const makeInterfacePropertyComparer = ({ isReversed }) => {
    const comparer = (l, r) => {
        if (l.type === utils_1.AST_NODE_TYPES.TSPropertySignature && r.type === utils_1.AST_NODE_TYPES.TSPropertySignature) {
            return compareProperty(l, r);
        }
        return 0;
    };
    return isReversed ? (l, r) => -comparer(l, r) : comparer;
};
const compareLiterals = (l, r) => {
    const a = typeof l;
    if (typeof l !== typeof r) {
        const lOrder = (0, exports.getLiteralTypeOrder)(typeof l);
        const rOrder = (0, exports.getLiteralTypeOrder)(typeof r);
        return lOrder - rOrder;
    }
    else if (typeof l === 'boolean' && typeof r === 'boolean') {
        return l === r ? 0 : r ? -1 : 1;
    }
    else if (typeof l === 'number' && typeof r === 'number') {
        return l - r;
    }
    else if (typeof l === 'bigint' && typeof r === 'bigint') {
        return l === r ? 0 : l < r ? -1 : 1;
    }
    else if (typeof l === 'string' && typeof r === 'string') {
        return l === r ? 0 : l < r ? -1 : 1;
    }
    else {
        return 0;
    }
};
const makeArrayValueComparer = ({ isReversed, sourceCode }) => {
    const fullText = sourceCode.getText();
    const comparer = (l, r) => {
        if (l.type === utils_1.AST_NODE_TYPES.Literal && r.type === utils_1.AST_NODE_TYPES.Literal) {
            return compareLiterals(l.value, r.value);
        }
        else if (l.type === r.type) {
            const lText = fullText.slice(...l.range);
            const rText = fullText.slice(...r.range);
            return lText === rText ? 0 : lText < rText ? -1 : 1;
        }
        else {
            return (0, exports.getAstNodeTypeOrder)(l.type) - (0, exports.getAstNodeTypeOrder)(r.type);
        }
    };
    return isReversed ? (l, r) => -comparer(l, r) : comparer;
};
const makeEnumMemberComparer = ({ isReversed }) => {
    const comparer = (l, r) => {
        if (l.id.type === utils_1.AST_NODE_TYPES.Literal && r.id.type === utils_1.AST_NODE_TYPES.Literal) {
            return compareLiterals(l.id.value, r.id.value);
        }
        else if (l.id.type === utils_1.AST_NODE_TYPES.Identifier && r.id.type === utils_1.AST_NODE_TYPES.Identifier) {
            return l.id.name === r.id.name ? 0 : l.id.name < r.id.name ? -1 : 1;
        }
        else {
            return (0, exports.getAstNodeTypeOrder)(l.id.type) - (0, exports.getAstNodeTypeOrder)(r.id.type);
        }
    };
    return isReversed ? (l, r) => -comparer(l, r) : comparer;
};
exports.ComparerUtils = {
    makeObjectPropertyComparer,
    makeInterfacePropertyComparer,
    makeArrayValueComparer,
    makeEnumMemberComparer,
};
