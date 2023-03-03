


import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Job } from '../models/jobs';
import jobValidator from '../utils/validators/job.validator';
import useValidateError from '../utils/err/input.error';
import { TypeParameter } from '../models/parameterType';
import { Parameter } from '../models/parameter';
import { Media } from '../models/mediaUserProfile';
import serverError from '../utils/err/server.error';
import userServices from '../services/user.services';
import moment = require('moment');
import slugify from 'slugify';
import { User } from '../models/user';
import { Profile } from '../models/userProfile';

class CercleController {
  
  

    public async myCercle(req: Request, res: Response){
        // Init
        const jProfile = db.getRepository(Profile);
    
        // Get the informations entry request
        const { slug } = req.body;
    
        // Get job data based on id
        const getMyCercle = await jProfile.findOne({
           where: { slug },
           relations:['user.profile','work_place', 'field_activity', 'contract_type'],
        });
        if (!getMyCercle) return serverError.noDataMatches(res);
    
        // Return Data
        return res.status(201).send({ job: getMyCercle });
    }

    

    public async pr(req: Request, res: Response){
        // Init
      
    
        // Get the informations entry request
    
        // Get job data based on id
      
    
        // Return Data
        return res.status(201).send();
    }



}

export default new CercleController();
