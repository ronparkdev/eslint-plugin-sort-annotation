"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../utils/array");
const comparer_1 = require("../utils/comparer");
const config_1 = require("../utils/config");
const createRule_1 = require("../utils/createRule");
const fix_1 = require("../utils/fix");
exports.default = (0, createRule_1.createRule)({
    name: 'sort-annotation',
    meta: {
        docs: {
            description: 'Sort array if annotated as @sort',
            recommended: 'error',
            suggestion: true,
        },
        fixable: 'code',
        type: 'suggestion',
        schema: [],
        messages: {
            hasUnsortedKeys: `has unsorted keys`,
        },
    },
    defaultOptions: [],
    create(context) {
        const sourceCode = context.getSourceCode();
        return {
            ArrayExpression(node) {
                const commentExpectedEndLine = node.loc.start.line - 1;
                const config = config_1.ConfigUtils.getConfig(sourceCode, '@sort', commentExpectedEndLine);
                if (!config) {
                    return;
                }
                const { isReversed } = config;
                const comparer = comparer_1.ComparerUtils.makeArrayValueComparer({ isReversed, sourceCode });
                const sortedElements = [...node.elements].sort(comparer);
                const needSort = array_1.ArrayUtils.zip2(node.elements, sortedElements).some(([element, sortedElement]) => element !== sortedElement);
                if (needSort) {
                    const diffRanges = array_1.ArrayUtils.zip2(node.elements, sortedElements).map(([from, to]) => ({
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
        };
    },
});
