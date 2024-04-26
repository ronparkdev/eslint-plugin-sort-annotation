"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HAS_UNSORTED_KEYS_MESSAGE_ID = void 0;
const types_1 = require("@typescript-eslint/types");
const array_1 = require("../utils/array");
const comparer_1 = require("../utils/comparer");
const config_1 = require("../utils/config");
const createRule_1 = require("../utils/createRule");
const fix_1 = require("../utils/fix");
exports.HAS_UNSORTED_KEYS_MESSAGE_ID = 'hasUnsortedKeys';
exports.default = (0, createRule_1.createRule)({
    name: 'sort-keys-annotation',
    meta: {
        docs: {
            description: 'Sort keys in object if annotated as @sort-keys',
            recommended: 'error',
            suggestion: true,
        },
        fixable: 'code',
        type: 'suggestion',
        schema: [],
        messages: {
            [exports.HAS_UNSORTED_KEYS_MESSAGE_ID]: `has unsorted keys`,
        },
    },
    defaultOptions: [],
    create(context) {
        const sourceCode = context.getSourceCode();
        const findParentReclusive = (node, parentTypes, deepCountingTypes) => {
            let currentNode = node;
            let deepLevel = 1;
            while ((currentNode = currentNode.parent) !== null) {
                if (deepCountingTypes.includes(currentNode.type)) {
                    deepLevel += 1;
                }
                if (parentTypes.includes(currentNode.type)) {
                    return { node: currentNode, deepLevel };
                }
            }
            return null;
        };
        return {
            ObjectExpression(node) {
                const result = findParentReclusive(node, [types_1.AST_NODE_TYPES.VariableDeclaration, types_1.AST_NODE_TYPES.TSTypeAliasDeclaration], [types_1.AST_NODE_TYPES.ObjectExpression]);
                if (!result) {
                    return;
                }
                const { node: parentNode, deepLevel: currentDeepLevel } = result;
                const commentExpectedEndLine = parentNode.loc.start.line - 1;
                const config = config_1.ConfigUtils.getConfig(sourceCode, '@sort-keys', commentExpectedEndLine);
                if (!config) {
                    return;
                }
                const { isReversed, deepLevel } = config;
                if (deepLevel < currentDeepLevel) {
                    return;
                }
                const comparer = comparer_1.ComparerUtils.makeObjectPropertyComparer({ isReversed });
                const properties = node.properties;
                const sortedProperties = [...properties].sort(comparer);
                const needSort = array_1.ArrayUtils.zip2(properties, sortedProperties).some(([property, sortedProperty]) => property !== sortedProperty);
                if (needSort) {
                    const diffRanges = array_1.ArrayUtils.zip2(node.properties, sortedProperties).map(([from, to]) => ({
                        from: from.range,
                        to: to.range,
                    }));
                    const fixedText = fix_1.FixUtils.getFixedText(sourceCode, node.range, diffRanges);
                    context.report({
                        node,
                        messageId: exports.HAS_UNSORTED_KEYS_MESSAGE_ID,
                        fix(fixer) {
                            return fixer.replaceTextRange(node.range, fixedText);
                        },
                    });
                }
            },
            TSInterfaceBody(node) {
                const result = findParentReclusive(node, [types_1.AST_NODE_TYPES.TSInterfaceDeclaration], [types_1.AST_NODE_TYPES.TSInterfaceBody]);
                if (!result) {
                    return;
                }
                const { node: parentNode, deepLevel: currentDeepLevel } = result;
                const commentExpectedEndLine = parentNode.loc.start.line - 1;
                const config = config_1.ConfigUtils.getConfig(sourceCode, '@sort-keys', commentExpectedEndLine);
                if (!config) {
                    return;
                }
                const { isReversed, deepLevel } = config;
                if (deepLevel < currentDeepLevel) {
                    return;
                }
                const comparer = comparer_1.ComparerUtils.makeInterfacePropertyComparer({ isReversed });
                const properties = node.body;
                const sortedProperties = [...properties].sort(comparer);
                const needSort = array_1.ArrayUtils.zip2(properties, sortedProperties).some(([property, sortedProperty]) => property !== sortedProperty);
                if (needSort) {
                    const diffRanges = array_1.ArrayUtils.zip2(properties, sortedProperties).map(([from, to]) => ({
                        from: from.range,
                        to: to.range,
                    }));
                    const fixedText = fix_1.FixUtils.getFixedText(sourceCode, node.range, diffRanges);
                    context.report({
                        node,
                        messageId: 'hasUnsortedKeys',
                        fix(fixer) {
                            return fixer.replaceTextRange(node.range, fixedText);
                        },
                    });
                }
            },
            TSTypeLiteral(node) {
                const result = findParentReclusive(node, [types_1.AST_NODE_TYPES.TSInterfaceDeclaration, types_1.AST_NODE_TYPES.TSTypeAliasDeclaration], [types_1.AST_NODE_TYPES.TSInterfaceBody, types_1.AST_NODE_TYPES.TSTypeLiteral]);
                if (!result) {
                    return;
                }
                const { node: parentNode, deepLevel: currentDeepLevel } = result;
                const commentExpectedEndLine = parentNode.loc.start.line - 1;
                const config = config_1.ConfigUtils.getConfig(sourceCode, '@sort-keys', commentExpectedEndLine);
                if (!config) {
                    return;
                }
                const { isReversed, deepLevel } = config;
                if (deepLevel < currentDeepLevel) {
                    return;
                }
                const comparer = comparer_1.ComparerUtils.makeInterfacePropertyComparer({ isReversed });
                const properties = node.members;
                const sortedProperties = [...properties].sort(comparer);
                const needSort = array_1.ArrayUtils.zip2(properties, sortedProperties).some(([property, sortedProperty]) => property !== sortedProperty);
                if (needSort) {
                    const diffRanges = array_1.ArrayUtils.zip2(properties, sortedProperties).map(([from, to]) => ({
                        from: from.range,
                        to: to.range,
                    }));
                    const fixedText = fix_1.FixUtils.getFixedText(sourceCode, node.range, diffRanges);
                    context.report({
                        node,
                        messageId: exports.HAS_UNSORTED_KEYS_MESSAGE_ID,
                        fix(fixer) {
                            return fixer.replaceTextRange(node.range, fixedText);
                        },
                    });
                }
            },
            TSEnumDeclaration(node) {
                const commentExpectedEndLine = node.loc.start.line - 1;
                const config = config_1.ConfigUtils.getConfig(sourceCode, '@sort-keys', commentExpectedEndLine);
                if (!config) {
                    return;
                }
                const { isReversed } = config;
                const comparer = comparer_1.ComparerUtils.makeEnumMemberComparer({ isReversed });
                const members = node.members;
                const sortedMembers = [...members].sort(comparer);
                const needSort = array_1.ArrayUtils.zip2(members, sortedMembers).some(([member, sortedMember]) => member !== sortedMember);
                if (needSort) {
                    const diffRanges = array_1.ArrayUtils.zip2(members, sortedMembers).map(([from, to]) => ({
                        from: from.range,
                        to: to.range,
                    }));
                    const fixedText = fix_1.FixUtils.getFixedText(sourceCode, node.range, diffRanges);
                    context.report({
                        node,
                        messageId: exports.HAS_UNSORTED_KEYS_MESSAGE_ID,
                        fix(fixer) {
                            return fixer.replaceTextRange(node.range, fixedText);
                        },
                    });
                }
            },
        };
    },
});
