import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { Job } from '../models/jobs';
import { TypeParameter } from '../models/parameterType';

class FieldActivityController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async number_activities_depending_job(req: Request, res: Response) {
      try {
         // Init
         const jParameter = db.getRepository(Parameter);
         let field_activity = [];

         field_activity = await jParameter.find({
            relations: { job: true, type_parameter: true },
            select: ['job', 'type_parameter'],
         });

         field_activity = field_activity.filter((el: any) => {
            return el.type_parameter.id === 1 && el.job.length > 0;
         });

         field_activity.forEach((el: any) => {
            el.job = el.job.length;
         });
         
        

         field_activity.sort((a, b) => {
            return   b.job - a.job
         })

         return res.send({ field_activity });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async show(req: Request, res: Response) {}

   //
   public async create(req: Request, res: Response, profileID: any) {
      try {
         // Init
         // Initialize the user profile
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new FieldActivityController();
