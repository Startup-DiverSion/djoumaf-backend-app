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
import moment = require('moment');

class ProfileExperienceController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
         const { user } = req.body;

         const jProfileExperience = db.getRepository(ExperienceCv);
         const jUser = db.getRepository(User);
         const relations = ['skill', 'skill.parameter', 'type_contract'];

         const getUser: any = await jUser.findOne({
            where: { id: user },
            relations: [
               'experience',
               'experience.skill',
               'experience.skill.parameter',
               'experience.type_contract',
            ],
            select: ['experience'],
         });
         if (!getUser) return serverError.noDataMatches(res);

         return res.send({ experiences: getUser.experience });
      } catch (error) {
         console.log(error);
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
         const experience = await jProfileExperience.findOne({
            where: { id },
            relations: [
               'skill.parameter',
               'type_contract',
            ],
         });

         // Return Data
         return res.status(201).send({ experience });
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
            currently_working,
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
         });
         const saveProfileExperience = await jProfileExperience.save(
            newProfile
         );
         

         // Add competance of Experience
         let competance = skills;
         for (let i = 0; i < competance.length; i++) {
            const el = competance[i];

            const parameter:any = await jParametre.findOne({
               where: { id: el.id },
               relations: { type_parameter: true },
            });

            const newSkill = jSkill.create({
               parameter: el.id,
               user: Auth.user.id,
               parent: parameter.type_parameter.id,
               experience: saveProfileExperience,
            });
            await jSkill.save(newSkill);
         }

         // saveProfileExperience.date_start = moment(
         //    saveProfileExperience.date_start
         // ).format('MMMM Y');
         // saveProfileExperience.date_finish =
         //    !saveProfileExperience.currently_working
         //       ? moment().format('MMMM Y')
         //       : 'En cours';

         return res.status(201).send({ experience: saveProfileExperience });
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
            type_experience,
            company,
            date_start,
            date_finish,
            work_place,
            description,
            skills,
            currently_working,
         } = req.body;

         // Initialize the user profile
         const jProfileExperience = db.getRepository(ExperienceCv);
         const jSkill = db.getRepository(SkillCv);
         const jParametre = db.getRepository(Parameter);
         const { Auth } = await userServices.current(req, res);

         const updateProfile = await jProfileExperience.update(
            { id },
            {
               id,
               company_name: company,
               type_contract: type_experience,
               date_start,
               date_finish,
               workplace: work_place,
               currently_working,
               description,
            }
         );
         const getProfileExperience: any = await jProfileExperience.findOne({
            where: { id },
            relations: ['skill', 'skill.parameter', 'type_contract'],
         });

         if (!getProfileExperience) return serverError.notInsertToDatabase(res);

         // Get all skill
         const getAllSkill = await jSkill.find({
            relations: { user: true, experience: true },
         });

         for (let i = 0; i < getAllSkill.length; i++) {
            const el: any = getAllSkill[i];
            if (
               el.user.id === Auth.user.id &&
               el.experience?.id == getProfileExperience.id
            ) {
               await jSkill.delete({ id: el.id });
            }
         }

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
               experience: getProfileExperience,
            });
            const savePreference = await jSkill.save(newSkill);
            if (!savePreference) return serverError.notInsertToDatabase(res);
         }

         

         const getOneProfileExperience: any = await jProfileExperience.findOne({
            where: { id },
            relations: ['skill', 'skill.parameter', 'type_contract'],
         });

         getOneProfileExperience.date_start = moment(
            getOneProfileExperience.date_start
         ).format('MMMM Y');
         getOneProfileExperience.date_finish =
            !getOneProfileExperience.currently_working
               ? moment().format('MMMM Y')
               : 'En cours';

         return res.status(201).send({ experience: getOneProfileExperience });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   //
   public async delete(req: Request, res: Response) {
      try {
         // Init
         const jProfileExperience = db.getRepository(ExperienceCv);
         const {id} = req.body;

         // Verify is job exist in database
         const isExperience = await jProfileExperience.findOne({ where: { id: id } });
         if (!isExperience) return serverError.noDataMatches(res);

         // Remove
         await jProfileExperience.softDelete({
            id
         });

         return res
            .status(201)
            .send({ experience: { message: 'Experience supprimer avec succès!' } });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }
}

export default new ProfileExperienceController();
