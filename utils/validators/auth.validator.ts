import * as Joi from "joi"
import { Request } from 'express';


class AuthValidator {
    constructor() {
      
    }

    // 
    public register(req: Request) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            signin_place: Joi.object().allow(null, {}, ''),
            device: Joi.object().allow(null, {}, '')
        });
        return schema.validate(req)
    
    }

    // 
    public login(req: Request) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            signin_place: Joi.object().allow(null, {}, ''),
            device: Joi.object().allow(null, {}, '')
        });
        return schema.validate(req)
    
    }

  
} 

export default new AuthValidator()
