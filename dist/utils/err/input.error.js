"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class useValidateError {
    constructor() {
    }
    static struct() {
    }
    /**
     * validator
     */
    input(res, error) {
        return res.status(400).send({
            message: error.details[0].message,
            path: error.details[0].path[0]
        });
    }
    /**
     * withoutInput
     */
    withoutInput(res, error) {
        return res.status(400).send({
            message: error.message,
            path: error.path
        });
    }
}
exports.default = new useValidateError();
