"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useValidateError = /** @class */ (function () {
    function useValidateError() {
    }
    useValidateError.struct = function () {
    };
    /**
     * validator
     */
    useValidateError.prototype.input = function (res, error) {
        return res.status(400).send({
            message: error.details[0].message,
            path: error.details[0].path[0]
        });
    };
    /**
     * withoutInput
     */
    useValidateError.prototype.withoutInput = function (res, error) {
        return res.status(400).send({
            message: error.message,
            path: error.path
        });
    };
    return useValidateError;
}());
exports.default = new useValidateError();
