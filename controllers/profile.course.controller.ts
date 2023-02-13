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

class ProfileCourseController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {

        // 
        const {id } = req.body


        // 
         const jProfileCourse = db.getRepository(CourseCV);
         const relations = ['diploma'];

        //  Get Current Profile
         const { Auth } = await userServices.current(req, res);

          // Get 
          const getProfileCourse = await jProfileCourse.find({
           where: {user: id}, relations
          });

         return res.send({ courses: getProfileCourse });
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
         const saveProfileCourse = await jProfileCourse.save(
            newProfileCourse
         );
         if (!saveProfileCourse)
            return serverError.notInsertToDatabase(res);


         return res.status(201).send({courses: saveProfileCourse});
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {
      try {
         // Init
         let {} = req.body;

         // Initialize the user profile
         const jProfileCourse = db.getRepository(CourseCV);
         const jMedia = db.getRepository(Media);
         const jPreference = db.getRepository(Preference);
         const jParametre = db.getRepository(Parameter);
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   //
   public async delete(req: Request, res: Response) {}
}

export default new ProfileCourseController();
