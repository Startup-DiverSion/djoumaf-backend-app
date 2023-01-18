import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { Job } from '../models/jobs';
import { ToApplyJob } from '../models/jobToApply';
import userServices from '../services/user.services';
import { send } from 'process';

class ToApplyController {


    

   //
   public async index(req: Request, res: Response) {
      try {
      } catch (error) {
         console.log(error);
      }
   }

   //
   public async show(req: Request, res: Response) {

        try {
            // Init
        const jToApply = db.getRepository(ToApplyJob)
        const { jobID, userID } = req.body;
        

        // Initialize

        // Get by specific selection one Apply data
        const getToApply = userID ? await jToApply.findOne({where: {user_id: userID , job_id: jobID}}) : await jToApply.findOne({where: {user_id: userID , job_id: jobID}}) 
        // Get length of user apply this jobs
        const getCount = await jToApply.countBy({job_id: jobID})
        if(!getToApply) return res.send({to_apply_job: null, count: getCount})

        // Return
        return res.send({to_apply_job: getToApply, count: getCount})
        } catch (error) {
            serverError.catchError(res, error);
        }
   }

   //
   public async create(req: Request, res: Response) {
      try {
         // Init
         const { jobID } = req.body;
         let newToApply: any;
         let updateToApply: any;


      

         // Initialize
         const jToApply = db.getRepository(ToApplyJob);
         const { Auth } = await userServices.current(req, res);
         
         //Get first apply  > User and Job
         const ifAllwaysApply: any = await jToApply.findOne({
            where: [{ user_id: Auth.user.id, job_id: jobID }],
         });
         
        

         // Verify if user allways to apply on post
         if (ifAllwaysApply) {
            updateToApply = await jToApply.update(
               { id: ifAllwaysApply.id },
               {
                  limit: ifAllwaysApply.limit + 1,
                  is_apply: ifAllwaysApply.is_apply ? false : true,
               }
            );

            if (updateToApply.affected)
               return res.send({
                  to_apply_job: await jToApply.findOne({
                     where: { user: Auth.user.id, job: jobID },
                  }),
               });
         }

         //  Create an new apply by current user on post
         newToApply = jToApply.create({
            job: jobID,
            job_id: jobID,
            user: Auth.user,
            user_id: Auth.user.id,
            is_apply: true,
            limit: 1,
         });
         const saveToApply = await jToApply.save(newToApply);

         //  If not insert on database
         if (!saveToApply)
            return serverError.notInsertToDatabase(res, { message: '' });

         // Send
         return res.send({ to_apply_job: saveToApply });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new ToApplyController();
