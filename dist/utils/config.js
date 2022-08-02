"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigUtils = void 0;
const utils_1 = require("@typescript-eslint/utils");
const getConfig = (sourceCode, annotationName, commentEndLine) => {
    const matchedComment = sourceCode
        .getAllComments()
        .filter((comment) => [utils_1.AST_TOKEN_TYPES.Line, utils_1.AST_TOKEN_TYPES.Block].includes(comment.type))
        .find((comment) => comment.loc.end.line === commentEndLine);
    if (!matchedComment) {
        return null;
    }
    const matchedCommentLineString = matchedComment.value
        .split('\n')
        .map((lineString) => lineString.trim())
        .find((lineString) => lineString.split(' ').includes(annotationName));
    if (!matchedCommentLineString) {
        return null;
    }
    const isReversed = matchedCommentLineString.includes(':reversed');
    return {
        isReversed,
    };
};
exports.ConfigUtils = {
    getConfig,
};
