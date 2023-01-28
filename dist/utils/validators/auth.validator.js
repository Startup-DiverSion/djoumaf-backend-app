"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var AuthValidator = /** @class */ (function () {
    function AuthValidator() {
    }
    // 
    AuthValidator.prototype.register = function (req) {
        var schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            signin_place: Joi.object().allow(null, {}, ''),
            device: Joi.object().allow(null, {}, '')
        });
        return schema.validate(req);
    };
    // 
    AuthValidator.prototype.login = function (req) {
        var schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            signin_place: Joi.object().allow(null, {}, ''),
            device: Joi.object().allow(null, {}, '')
        });
        return schema.validate(req);
    };
    return AuthValidator;
}());
exports.default = new AuthValidator();
