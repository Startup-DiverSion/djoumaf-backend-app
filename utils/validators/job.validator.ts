import * as Joi from "joi"
import { Request } from 'express';


class JobValidator {
    constructor() {

    }

    // 
    public post(req: Request) {
        const schema = Joi.object({
            id: Joi.allow(),
            title: Joi.string().required(),
            field_activity: Joi.string().required(),
            work_place: Joi.string().required(),
            contract_type: Joi.string().required(),
            localizaton_country: Joi.object().required(),
            localizaton_city: Joi.object().required(),
            dead_line: Joi.string().required(),
            description: Joi.string().required()
        });
        return schema.validate(req)

    }


}

export default new JobValidator()
