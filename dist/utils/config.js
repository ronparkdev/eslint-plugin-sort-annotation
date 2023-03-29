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
        .find((lineString) => lineString.split(' ').find((str) => str.startsWith(annotationName)));
    if (!matchedCommentLineString) {
        return null;
    }
    const options = matchedCommentLineString.split(':');
    const isReversed = options.includes('reversed');
    const deepLevel = (() => {
        const matchedExecResult = options
            .map((option) => /deep(\((\d+)\))?/.exec(option))
            .find((execResult) => !!execResult);
        if (!matchedExecResult) {
            return 1;
        }
        const level = parseInt(matchedExecResult[2], 10);
        if (isNaN(level)) {
            return Number.MAX_SAFE_INTEGER;
        }
        return level;
    })();
    return {
        isReversed,
        deepLevel,
    };
};
exports.ConfigUtils = {
    getConfig,
};
