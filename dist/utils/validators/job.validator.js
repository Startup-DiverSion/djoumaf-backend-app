"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Joi = require("joi");
var JobValidator = /** @class */ (function () {
    function JobValidator() {
    }
    // 
    JobValidator.prototype.post = function (req) {
        var schema = Joi.object({
            title: Joi.string().required(),
            field_activity: Joi.string().required(),
            work_place: Joi.string().required(),
            contract_type: Joi.string().required(),
            localizaton_country: Joi.object().required(),
            localizaton_city: Joi.object().required(),
            dead_line: Joi.string().required(),
            description: Joi.string().required()
        });
        return schema.validate(req);
    };
    return JobValidator;
}());
exports.default = new JobValidator();
