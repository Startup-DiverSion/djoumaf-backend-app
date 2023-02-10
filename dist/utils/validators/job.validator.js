"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
class JobValidator {
    constructor() {
    }
    // 
    post(req) {
        const schema = Joi.object({
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
    }
}
exports.default = new JobValidator();
