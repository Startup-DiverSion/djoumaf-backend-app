"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
class AuthValidator {
    constructor() {
    }
    // 
    register(req) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            signin_place: Joi.object().allow(null, {}, ''),
            device: Joi.object().allow(null, {}, '')
        });
        return schema.validate(req);
    }
    // 
    login(req) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            signin_place: Joi.object().allow(null, {}, ''),
            device: Joi.object().allow(null, {}, '')
        });
        return schema.validate(req);
    }
}
exports.default = new AuthValidator();
