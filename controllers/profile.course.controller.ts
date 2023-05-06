import { Request, Response, query } from 'express';
import { db } from '../database/index.database';
import serverError from '../utils/err/server.error';
import { User } from '../models/user';
import useValidateError from '../utils/err/input.error';
import { Media } from '../models/mediaUserProfile';
import { Preference } from '../models/userPreference';
import slugify from 'slugify';
import { Parameter } from '../models/parameter';
import { TypeParameter } from '../models/parameterType';
import MediaService from '../services/media.services';
import MediaController from './media.controller';
import { MediaCover } from '../models/mediaUserProfileCover';
import { Not, IsNull } from 'typeorm';
import userServices from '../services/user.services';
import { SkillCv } from '../models/cvSkill';
import { slugGetter } from './../utils/adv/slug';
import { CourseCV } from '../models/cvCourse';
import { Profile } from '../models/userProfile';
import moment = require('moment');

class ProfileCourseController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {

        // 
        const {user } = req.body


        // 
         const jProfileCourse = db.getRepository(CourseCV);
         const jUser = db.getRepository(User)
         
         const getUser:any = await jUser.findOne({
            where: {id: user}, relations: ['course', 'course.diploma'], select: ['course']
         })
         if (!getUser) return serverError.noDataMatches(res);

         return res.send({ courses: getUser.course });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async show(req: Request, res: Response) {
      try {
         // Init
         const jProfileCourse = db.getRepository(CourseCV);

         // Get the informations entry request
         const { id } = req.body;

         // Get job data based on id
         const getProfile = await jProfileCourse.findOne({
            where: { id: id.id },
         });
         if (!getProfile) return serverError.noDataMatches(res);

         // Return Data
         return res.status(201).send({ profile: getProfile });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async create(req: Request, res: Response) {
      try {
         // Init
         let {
            etablishment,
            domain,
            date_start,
            date_finish,
            diploma,
            description,
            work_place,
            currently_working
         } = req.body;

         // Initialize the user profile
         const jProfileCourse = db.getRepository(CourseCV);
         const jSkill = db.getRepository(SkillCv);
         const jParametre = db.getRepository(Parameter);
         const { Auth } = await userServices.current(req, res);

         const { jSlug } = await slugGetter(res, etablishment, CourseCV);

         const newProfileCourse = jProfileCourse.create({
            slug: jSlug,
            user: Auth.user.id,
            etablishment,
            diploma,
            domain,
            date_start,
            date_finish,
            workplace: work_place,
            currently_working,
            description,
         });
         const saveProfileCourse:any = await jProfileCourse.save(
            newProfileCourse
         );
         if (!saveProfileCourse)
            return serverError.notInsertToDatabase(res);

            const getCourse = await jProfileCourse.findOne({where: {id: saveProfileCourse.id}, relations: {diploma: true}})

         //    getCourse.date_start = moment(
         //       getCourse.date_start
         // ).utc().format(' Y');
         // getCourse.date_finish =
         //    !getCourse.currently_working
         //       ? moment().utc().format(' Y')
         //       : 'En cours';


         return res.status(201).send({course: getCourse});
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {
      try {
         // Init
         let {
            id,
            etablishment,
            domain,
            date_start,
            date_finish,
            diploma,
            description,
            work_place,
            currently_working
         } = req.body;

         // Initialize the user profile
         const jProfileCourse = db.getRepository(CourseCV);
         const jSkill = db.getRepository(SkillCv);
         const jParametre = db.getRepository(Parameter);
         const { Auth } = await userServices.current(req, res);

         const { jSlug } = await slugGetter(res, etablishment, CourseCV);

         const updateProfileCourse = jProfileCourse.update({id},{
            slug: jSlug,
            user: Auth.user.id,
            etablishment,
            diploma,
            domain,
            date_start,
            date_finish,
            workplace: work_place,
            currently_working,
            description,
         });
         
         if (!updateProfileCourse)
            return serverError.notInsertToDatabase(res);

            const getCourse = await jProfileCourse.findOne({where: {id}, relations: {diploma: true}})

         //    getCourse.date_start = moment(
         //       getCourse.date_start
         // ).format(' Y');
         // getCourse.date_finish =
         //    !getCourse.currently_working
         //       ? moment().format(' Y')
         //       : 'En cours';


         return res.status(201).send({course: getCourse});
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async delete(req: Request, res: Response) {
      try {
         // Init
         const jProfileCourse = db.getRepository(CourseCV);
         const {id} = req.body;

         // Verify is job exist in database
         const isCourse = await jProfileCourse.findOne({ where: { id: id } });
         if (!isCourse) return serverError.noDataMatches(res);

         // Remove job
         await jProfileCourse.softDelete({
            id
         });

         return res
            .status(201)
            .send({ course: { message: 'Formation supprimer avec succès!' } });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }
}

export default new ProfileCourseController();
