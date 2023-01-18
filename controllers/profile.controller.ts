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

class ProfileController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {}

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
         const getProfile = await jProfile.findOne({
            where: { slug: slug },
            relations: { user: true, media_profile: true, media_profile_cover: true },
         });
         if (!getProfile) return serverError.noDataMatches(res);
         console.log(getProfile)


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
         const jParametre =db.getRepository(Parameter);

         const full_name = last_name + ' ' + first_name;
         let slugExist: any;
         let slug: string;

     

         do {

            // Defined the letter associated
            const letter = 'd j o u m a f'.split(' ')
            const letterRamdom = Math.floor(Math.random() * letter.length)

            // Defined the slug of profile
            slug =  `${slugify(full_name, '_')}_${Math.floor(Math.random() * 10000)}${letter[letterRamdom]}`.toLowerCase();

            // Get profile
            slugExist = await db
               .getRepository(Profile)
               .findOne({ where: { slug } });
            if (slugExist)
               return useValidateError.withoutInput(res, {
                  message: 'slug est dèja utiliser !',
                  path: 'all',
               });
         } while (slugExist);

         
        
         // Add image to profile
         await MediaController.create(req, res, id);
         // if (req.file) {
         //    const newMedia = jMedia.create({
         //       url: req.file,
         //       profile: id,
         //    });

         //    const saveMedia = await jMedia.save(newMedia);
         //    if (!saveMedia) return serverError.notInsertToDatabase(res);
         // }
        
         // Add preference of profile
         preferenceID =  JSON.parse(preferenceID)?.pref
         for (let i = 0; i < preferenceID.length; i++) {
            const el = preferenceID[i];
         

            const parameter = await jParametre.findOne({where: {id: el}, relations: {type_parameter: true}})

            const newPreference = jPreference.create({
               parameter: el,
               user: userID,
               parent: parameter.type_parameter
            });
            const savePreference = await jPreference.save(newPreference);
            if (!savePreference) return serverError.notInsertToDatabase(res);

            if(savePreference.parameter === type_user){
               type_user = savePreference
            }
         }

       

         let updateProfile = jProfile.update(
            { id: id },
            {
               id,
               first_name,
               last_name,
               type_user,
               full_name,
               description,
               slug,
               bio,
               lvl: 1,
            }
         );
         if (!updateProfile) return serverError.notInsertToDatabase(res);


         const xProfile = await db.getRepository(Profile).findOne({where: {id}});
         if (!updateProfile) return serverError.noDataMatches(res);
          


         return res.send({ profile: xProfile});
      } catch (error) {
         console.log(error)
         serverError.catchError(res, error);
      }
   }

   //
   public async delete(req: Request, res: Response) {}
}

export default new ProfileController();
