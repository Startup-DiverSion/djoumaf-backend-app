import { Request, Response } from 'express';
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
import { ExperienceCv } from '../models/cvExperience';
import userServices from '../services/user.services';
import { SkillCv } from '../models/cvSkill';
import { slugGetter } from './../utils/adv/slug';

class ProfileExperienceController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
         const jProfileExperience = db.getRepository(ExperienceCv);
         const relations = ['skill', 'skill.parameter', 'type_contract'];
         const { Auth } = await userServices.current(req, res);

          // Get 
          const getProfileExperience = await jProfileExperience.find({
           where: {user: Auth.user.id}, relations
          });

         return res.send({ experiences: getProfileExperience });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async show(req: Request, res: Response) {
      try {
         // Init
         const jProfileExperience = db.getRepository(ExperienceCv);

         // Get the informations entry request
         const { id } = req.body;

         // Get job data based on id
         const getProfile = await jProfileExperience.findOne({
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
            type_experience,
            company,
            date_start,
            date_finish,
            work_place,
            description,
            skills,
            currently_working
         } = req.body;

         // Initialize the user profile
         const jProfileExperience = db.getRepository(ExperienceCv);
         const jSkill = db.getRepository(SkillCv);
         const jParametre = db.getRepository(Parameter);
         const { Auth } = await userServices.current(req, res);

         const { jSlug } = await slugGetter(res, company, ExperienceCv);

         const newProfile = jProfileExperience.create({
            slug: jSlug,
            user: Auth.user.id,
            company_name: company,
            type_contract: type_experience,
            date_start,
            date_finish,
            workplace: work_place,
            currently_working,
            description,
            skill: skills,
         });
         const saveProfileExperience = await jProfileExperience.save(
            newProfile
         );
         if (!saveProfileExperience)
            return serverError.notInsertToDatabase(res);

         // Add competance of Experience
         let competance = skills;
         for (let i = 0; i < competance.length; i++) {
            const el = competance[i];

            const parameter = await jParametre.findOne({
               where: { id: el.id },
               relations: { type_parameter: true },
            });

            const newSkill = jSkill.create({
               parameter: el.id,
               user: Auth.user,
               parent: parameter.type_parameter,
               experience: saveProfileExperience,
            });
            const savePreference = await jSkill.save(newSkill);
            if (!savePreference) return serverError.notInsertToDatabase(res);
         }

         return res.status(201).send({experiences: saveProfileExperience});
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
         const jProfileExperience = db.getRepository(ExperienceCv);
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

export default new ProfileExperienceController();
