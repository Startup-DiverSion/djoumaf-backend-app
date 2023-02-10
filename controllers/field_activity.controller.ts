import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { Job } from '../models/jobs';

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
            const getAllJobs = db.getRepository(Job)
            let field_activity = []

            // Get
            // const JFieldActivity = await getAllJobs.find({relations: {field_activity : true}})
            // if(!JFieldActivity) return res.send({field_activity})

            // JFieldActivity.forEach(field => {

            //     for (let i = 0; i < field_activity.length; i++) {
            //         const el = field_activity[i];
                    
            //         if(field.title !== el.name){
            //             field_activity.push({name: field.title, count: 0 })
            //         }else{
            //             el.count = el.count + 1
            //         }

            //     }
                
            // });

            return res.send({field_activity})

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
