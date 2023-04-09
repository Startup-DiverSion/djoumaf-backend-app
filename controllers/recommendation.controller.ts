


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

class RecommendationController {
  
  

    public async JobBasedOnProfile(req: Request, res: Response){
        // Init
        const jJob = db.getRepository(Job);
    
        // Get the informations entry request
        const { slug } = req.body;
    
        // Get job data based on id
        const getJob = await jJob.findOne({
           where: { slug },
           relations:['user.profile','work_place', 'field_activity', 'contract_type'],
        });
        if (!getJob) return serverError.noDataMatches(res);
    
        // Return Data
        return res.status(201).send({ job: getJob });
    }

    

    public async theProfilesYouCanFollow(req: Request, res: Response){
        // Init
      
    
        // Get the informations entry request
    
        // Get job data based on id
      
    
        // Return Data
        return res.status(201).send();
    }



}

export default new RecommendationController();
