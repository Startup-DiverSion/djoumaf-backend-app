import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { skills } from '../skills';
import { Job } from '../models/jobs';

class SearchController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
         const { Qsearch } = req.body;

         //  Search Job
         const jJob = db.getRepository(Job);
         const JobSearch = await jJob.find({
            relations: [
               'user',
               'user.profile',
               'user.profile.media_profile',
               'work_place',
               'field_activity',
               'contract_type',
               'user.follows',
            ],
         });

         const JobSearch__get = JobSearch.filter((job) => {
            return (
               job.title.toLowerCase().includes(Qsearch.toLowerCase()) ||
               job.description.toLowerCase().includes(Qsearch.toLowerCase()) ||
               job.city.toLowerCase().includes(Qsearch.toLowerCase()) ||
               job.country.toLowerCase().includes(Qsearch.toLowerCase()) ||
               job.contract_type.title.toLowerCase().includes(Qsearch.toLowerCase())
            );
         });

         return res.send({ s_jobs: JobSearch__get });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }
}

export default new SearchController();
