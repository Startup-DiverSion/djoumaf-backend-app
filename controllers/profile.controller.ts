import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
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
import { slugGetter } from '../utils/adv/slug';
import { env } from '../config/env.config';

class ProfileController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
         const query: any = req.query;

         const JProfile = db.getRepository(Profile);
         let getAllProfile: any = [];
         const relations = ['user', 'media_profile', 'media_profile_cover'];

         const limit: any = query.limit ? parseInt(query.limit) : null;
         const page: any = query.page  ? parseInt(query.page) : null;
         const type: any = query.type ? parseInt(query.type) : null;

      

         

         if (limit && type && page) {
            const offset=(Number(page)-1)*limit;
            getAllProfile = await JProfile.find({
               take: limit,
               skip: offset,
               where: { typeuser: type, slug: Not(IsNull()) },
               relations,
            });
         } 
         else {
            getAllProfile = await JProfile.find({
               where: { slug: Not(IsNull()) },
               relations,
            });
         }

         return res.send({ profiles: getAllProfile });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }



   public async particulier(req: Request, res: Response) {
      try {
         const JProfile = db.getRepository(Profile);
         const jParameter = db.getRepository(Parameter);
         const relations = [
            'user',
            'type',
            'media_profile',
            'media_profile_cover',
         ];

         const xParameter: any = await jParameter.findOne({
            where: { title: 'Particulier' },
            relations: ['profile'],
         });
         if (!xParameter) return res.send({ profiles: [] });

         const gatA: any = xParameter.profile.filter((el: any) => {
            return el.slug !== null;
         });

         return res.send({ profiles: xParameter });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   //
   public async show(req: Request, res: Response) {
      try {
         // Init
         const jProfile = db.getRepository(Profile);

         // Get the informations entry request
         const { id } = req.body;

         // Get job data based on id
         const getProfile = await jProfile.findOne({
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
   public async showWihSlug(req: Request, res: Response) {
      try {
         // Init
         const jProfile = db.getRepository(Profile);

         // Get the informations entry request
         const { slug } = req.body;

         // Get job data based on id
         const getProfile :any = await jProfile.findOne({
            where: { slug: slug },
            relations:['user', 'media_profile', 'media_profile_cover', 'job', 'job.to_apply'],
         });

         getProfile.job.forEach((el:any) => {
            el.to_apply = el.to_apply.length
         });
        

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

         // Initialize the user profile
         const jProfile = db.getRepository(Profile);

         const newProfile = jProfile.create({
            first_name: '',
            last_name: '',
            full_name: '',
            bio: '',
            lvl: 0,
         });
         const saveProfile = await jProfile.save(newProfile);
         if(saveProfile){
            // Add image to profile
            MediaController.create(req, res, saveProfile.id);
         }
         if (!saveProfile) return serverError.notInsertToDatabase(res);

         return saveProfile;
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
            userID,
            first_name,
            last_name,
            type_user,
            bio,
            description,
            preferenceID,
         } = req.body;

         // Initialize the user profile
         const jProfile = db.getRepository(Profile);
         const jMedia = db.getRepository(Media);
         const jPreference = db.getRepository(Preference);
         const jParametre = db.getRepository(Parameter);

         const full_name = last_name + ' ' + first_name;
         let slugExist: any;
         let slug: string;
     

         const {jSlug} = await slugGetter(res, full_name, Profile)
         slug = jSlug

         //  Media: Add a new image to profile.
         if (req.file) {
            jMedia.update(
               { profile: id },
               {
                  url: req.file.filename,
                  original_url: env.HOST_CLIENT_IMAGE + '/' + req.file.filename,
               }
            );
         }

         


         // Add preference of profile
         preferenceID = JSON.parse(preferenceID)?.pref;
         for (let i = 0; i < preferenceID.length; i++) {
            const el = preferenceID[i];

            const parameter = await jParametre.findOne({
               where: { id: el },
               relations: { type_parameter: true },
            });

            const newPreference = jPreference.create({
               parameter: el,
               user: userID,
               parent: parameter.type_parameter,
            });
            const savePreference = await jPreference.save(newPreference);
            if (!savePreference) return serverError.notInsertToDatabase(res);

            if (savePreference.parameter === type_user) {
               type_user = savePreference;
            }
         }

         let updateProfile = jProfile.update(
            { id: id },
            {
               id,
               first_name,
               last_name,
               type: type_user,
               typeuser: type_user,
               full_name,
               description,
               slug,
               bio,
               lvl: 1,
            }
         );
         if (!updateProfile) return serverError.notInsertToDatabase(res);

         const getProfile:any = await db
         .getRepository(Profile)
         .findOne({ where: { id }});

         const xUser = await db
            .getRepository(User)
            .findOne({ where: { profile: getProfile?.id } });
         if (!xUser) return serverError.noDataMatches(res);

         return res.send({ user: xUser });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   //
   public async updateOfProfile(req: Request, res: Response) {
      try {
         // Init
         let {
            id,
            first_name,
            last_name,
            bio,
            sex,
            born,
            contact,
            adresse,
            site_web,
            description,
         } = req.body;

         // Initialize the user profile
         const jProfile = db.getRepository(Profile);
         const jMedia = db.getRepository(Media);
         const jPreference = db.getRepository(Preference);
         const jParametre = db.getRepository(Parameter);

         const full_name = last_name + ' ' + first_name;
         const { jSlug } = await slugGetter(res, full_name, Profile);

         let updateProfile = jProfile.update(
            { id: id },
            {
               first_name,
               last_name,
               full_name,
               description,
               adresse,
               site_web,
               sex,
               born,
               bio,
            }
         );
         if (!updateProfile) return serverError.notInsertToDatabase(res);

         const xUser = await db
            .getRepository(Profile)
            .findOne({ where: { id }, relations: ['user', 'media_profile', 'media_profile_cover'] });
         if (!xUser) return serverError.noDataMatches(res);

         return res.send({ profile: xUser });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   public async updateDescription(req: Request, res: Response) {
      try {
         // Init
         let {
            id,
            description,
         } = req.body;

         // Initialize the user profile
         const jProfile = db.getRepository(Profile);
         const jMedia = db.getRepository(Media);
         const jPreference = db.getRepository(Preference);
         const jParametre = db.getRepository(Parameter);

         let updateProfileDescription = jProfile.update(
            { id: id },
            {
               description
            }
         );
         if (!updateProfileDescription) return serverError.notInsertToDatabase(res);

         const xUser = await db
            .getRepository(Profile)
            .findOne({ where: { id }, relations: ['user', 'media_profile', 'media_profile_cover'] });
         if (!xUser) return serverError.noDataMatches(res);

         return res.send({ description: xUser.description });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   // Update bio
   public async updateBio(req: Request, res: Response) {

      try {
         // Init
         const jProfile = db.getRepository(Profile);
         // Initialize the user profile
   
         const getAllProfileToUpadate = await jProfile.find({where: {bio: 'test'}})
         getAllProfileToUpadate.forEach((el:any) => {

            const desc: any = `
            Hello ! moi c'est ${el.full_name},
            Je suis un utilisateur de DjoumAf.
            `
            jProfile.update({
               id: el.id
            }, {
               bio: 'Utilisateur de DjoumAf',
               description: desc
            })
         })

         return res.status(201).send({Result: 'fait'})
         
      } catch (error) {
         serverError.catchError(res, error);
      }

   }

  

   //
   public async delete(req: Request, res: Response) {}
}

export default new ProfileController();
