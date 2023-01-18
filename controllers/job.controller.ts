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

class JobController extends ToApplyJob {
  
  
   //
   public async index(req: Request, res: Response) {
      try {
         // Init
         const jJob = db.getRepository(Job);

         // Get all jobs
         const getAllJobs = await jJob.find({relations: ["user",  'profile', 'profile.media_profile', 'profile.media_profile_cover','work_place', 'field_activity', 'contract_type'] })


         res.status(201).send({ Jobs: getAllJobs });
      } catch (error) {
         console.log(error);
      }
   }

   //Show Job
   public async show(req: Request, res: Response) {
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
            slug: slugify(title, '_'),
            description,
            field_activity,
            work_place,
            contract_type,
            localization: place,
            dead_line: moment(dead_line).toDate(),
            user: Auth.user,
            profile: (await db.getRepository(User).findOne({where: {id: Auth.user.id}, relations: ['profile']})).profile
         });
         const saveJob = await jJob.save(newJob);
         if (!saveJob) return serverError.notInsertToDatabase(res);

         return res.status(201).send({ job: saveJob });
      } catch (error) {
         console.log(error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {
      try {
         // Init
         const jJob = db.getRepository(Job);
         const parmas: any = req.params.id;

         // Verify is job exist in database
         const isJob = await jJob.findOne({ where: { id: parmas } });
         if (!isJob) return serverError.noDataMatches(res);

         // Remove job
         await jJob.delete({
            id: parmas,
         });

         return res
            .status(201)
            .send({ job: { message: 'Jobs supprimer avec succès!' } });
      } catch (error) {
         console.log(error);
      }
   }




}

export default new JobController();
