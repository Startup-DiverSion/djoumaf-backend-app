import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { Job } from '../models/jobs';
import { TypeParameter } from '../models/parameterType';
import { ActivityLog } from '../models/userActivityLog';
import userServices from '../services/user.services';
import moment = require('moment');

interface CREATED {
   title: string;
   tag: string,
   type: string,
   source: string;
   source_id: Number;
}

class ActivityLogController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
        // Init

        // Db
        const jActivityLog = db.getRepository(ActivityLog)
        const { Auth } = await userServices.current(req, res);

        let getAllActivityLog = await jActivityLog.find({relations: {log_status: true, user: true}, order: { created_at: 'DESC' }})
        getAllActivityLog = getAllActivityLog.filter((el) => {
            return el.user.id === Auth.user.id && moment().diff(moment(el.created_at), 'months', true) <= 1.5
        })


        
        return res.status(201).send({activity_log: getAllActivityLog})

      } catch (error) {
         console.log(error)
      serverError.catchError(res, error);
      }
   }

   //
   public async show(req: Request, res: Response) {}

   //
   public async create(req: Request, res: Response, data: CREATED) {
      try {
         // Init
         const { title, tag, source, source_id, type } = data;
         const id: any = 9;

         // Initialize the user profile
         const jActivityLog = db.getRepository(ActivityLog);
         const jTypeParameter = db.getRepository(TypeParameter);
         const { Auth } = await userServices.current(req, res)

         // Get parameter
         const getParameter: any = await jTypeParameter.findOne({
            where: { id },
            relations: { parameter: true },
         });

        //  Get Activity log parameter
         const activityLog: any = getParameter.parameter
         let log_status = activityLog.find((el:any) => {
            el.title === title;
         });
         if (!log_status) log_status = null;

        //  Create
         const newActivityLog = jActivityLog.create({
            source,
            title,
            tag,
            type,
            source_id,
            log_status,
            user: Auth.user.id
         });

         const saveActivityLog = await jActivityLog.save(newActivityLog);

      } catch (error) {
         console.log(error)
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new ActivityLogController();
