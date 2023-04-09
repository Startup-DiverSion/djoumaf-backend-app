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
import { ToApplyJob } from '../models/jobToApply';
import activity_logController from './activity_log.controller';
import { slugGetter } from '../utils/adv/slug';

class JobController extends ToApplyJob {
   //
   public async index(req: Request, res: Response) {
      try {
         // Init
         const jJob = db.getRepository(Job);
         let { num_jobs, count }:any = req.query
         let num_jobs_H:number, count_H :number;
         console.log(num_jobs, count)

         if(num_jobs == undefined && count == undefined) {
             num_jobs_H = 100
             count_H = 0
         }else{
             num_jobs_H =  parseInt(num_jobs)
             count_H = parseInt(count)
         }

         const relations = [
            'user',
            'profile',
            'profile.media_profile',
            'profile.media_profile_cover',
            'work_place',
            'field_activity',
            'contract_type',
         ]

         

         // Get all jobs
         const getAllJobs = await jJob.find({
            relations,
            take: Math.max(num_jobs_H, count_H),
         });

         res.status(201).send({ Jobs: getAllJobs });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }

   //Show Job
   public async show(req: Request, res: Response) {
      // Init
      const jJob = db.getRepository(Job);
      const jFieldActivity = db.getRepository(Parameter);

      // Get the informations entry request
      const { slug } = req.body;
      const relations = [
         'job',
         'job.profile',
         'job.profile.user',
         'job.profile.media_profile',
         'job.work_place',
         'job.contract_type',
         'job.profile.user'
      ]

      // Get job data based on id
      const getJob:any = await jJob.findOne({
         where: { slug },
         relations: [
            'user',
            'user.profile',
            'user.profile.media_profile',
            'work_place',
            'field_activity',
            'contract_type',
            'user.follows'
         ],
      });
      if (!getJob) return serverError.noDataMatches(res);

      let interesting:any = await jFieldActivity.find({where: {id: getJob.field_activity.id}, relations})
      

      // Return Data
      return res.status(201).send({ job: getJob, interesting: interesting[0].job.slice(0, 4) });
   }

   // Create Job
   public async create(req: Request, res: Response) {
      try {
         // Init
         const jJob = db.getRepository(Job);
         const jParameter = db.getRepository(Parameter);
         const { Auth } = await userServices.current(req, res);

         // Get the informations entry request
         const {
            title,
            description,
            field_activity,
            work_place,
            contract_type,
            localizaton_country,
            localizaton_city,
            dead_line,
         } = req.body;

         // Validate the informations
         const { error } = jobValidator.post(req.body);
         if (error) {
            return useValidateError.input(res, error);
         }

         const { jSlug } = await slugGetter(res, title, Job);

         //verification of foreign keys in paramater table
         const verifyForeignKeys = async (Keys: any) => {
            for (let i = 0; i < Keys.length; i++) {
               const el = Keys[i];
               const vForeignKeys = await jParameter.findOne({
                  where: {
                     id: el,
                  },
               });
               if (!vForeignKeys)
                  return useValidateError.withoutInput(res, {
                     path: el,
                     message: `${el} n'exist pas.`,
                  });
            }
         };

         // Checking the parameter table
         verifyForeignKeys([field_activity, work_place, contract_type]);
         const place: Object = {
            country: localizaton_country,
            city: localizaton_city,
         };

         // Create and add a new jobs
         const newJob = jJob.create({
            title,
            slug: jSlug,
            description,
            field_activity,
            work_place,
            contract_type,
            country: localizaton_country?.name,
            city: localizaton_city?.name,
            dead_line: moment(dead_line).toDate(),
            user: Auth.user,
            profile: (
               await db
                  .getRepository(User)
                  .findOne({
                     where: { id: Auth.user.id },
                     relations: ['profile'],
                  })
            ).profile,
         });
         const saveJob = await jJob.save(newJob);
         if (!saveJob) return serverError.notInsertToDatabase(res);

         const ActivityLog = await activity_logController.create(req, res, {
            title,
            tag: 'Offre d\'emploi',
            type: 'job',
            source: '/jobs/' + jSlug,
            source_id: saveJob.id,
         });

         return res
            .status(201)
            .send({ job: saveJob, activity_log: ActivityLog });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {
      try {
         // Init
         const jJob = db.getRepository(Job);
         const jParameter = db.getRepository(Parameter);
         const { Auth } = await userServices.current(req, res);

         // Get the informations entry request
         const {
            id,
            title,
            description,
            field_activity,
            work_place,
            contract_type,
            localizaton_country,
            localizaton_city,
            dead_line,
         } = req.body;

         // Validate the informations
         const { error } = jobValidator.post(req.body);
         if (error) {
            return useValidateError.input(res, error);
         }

         //verification of foreign keys in paramater table
         const verifyForeignKeys = async (Keys: any) => {
            for (let i = 0; i < Keys.length; i++) {
               const el = Keys[i];
               const vForeignKeys = await jParameter.findOne({
                  where: {
                     id: el,
                  },
               });
               if (!vForeignKeys)
                  return useValidateError.withoutInput(res, {
                     path: el,
                     message: `${el} n'exist pas.`,
                  });
            }
         };

         // Checking the parameter table
         verifyForeignKeys([field_activity, work_place, contract_type]);
         const place: Object = {
            country: localizaton_country,
            city: localizaton_city,
         };

         // Create and add a new jobs
         await jJob.update(
            { id },
            {
               title,
               description,
               field_activity,
               work_place,
               contract_type,
               country: localizaton_country?.name,
               city: localizaton_city?.name,
               dead_line: moment(dead_line).toDate(),
               user: Auth.user,
               profile: (
                  await db
                     .getRepository(User)
                     .findOne({
                        where: { id: Auth.user.id },
                        relations: ['profile'],
                     })
               ).profile,
            }
         );

         const getJob = await jJob.findOne({ where: { id } });

         return res.status(201).send({ job: getJob });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }

   //
   public async delete(req: Request, res: Response) {
      try {
         // Init
         const jJob = db.getRepository(Job);
         const {id} = req.body;

         // Verify is job exist in database
         const isJob = await jJob.findOne({ where: { id: id } });
         if (!isJob) return serverError.noDataMatches(res);

         // Remove job
         await jJob.softDelete({
            id
         });

         return res
            .status(201)
            .send({ job: { message: 'Job supprimer avec succès!' } });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }
}

export default new JobController();
