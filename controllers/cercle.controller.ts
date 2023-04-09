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
import { Profile } from '../models/userProfile';
import { Follow } from './../models/userFollow';

class CercleController {
   /**
    *
    *
    *
    *
    */
   public async AmyCercle(req: any, res: any, AuthUserCurrentConnect: any) {
      // Init

      const jProfile = db.getRepository(Profile);
      const jUser = db.getRepository(User);
      const jUserFollow = db.getRepository(Follow);

      // Get job data based on id
      const __getMyCercleAbonnement = await jUserFollow.find({
         where: { owner: AuthUserCurrentConnect },
         relations: [
            'users',
            'users.profile',
            'users.profile.user',
            'users.profile.media_profile',
            'users.profile.media_profile_cover',
         ],
      });

      // Get all souscrible
      let getMyCercleAbonner = [];
      const __getMyCercleAbonner: any = await jUserFollow.find({
         relations: [
            'users.profile',
            'users.profile.media_profile',
            'users.profile.user',
            'users.profile.media_profile_cover',
         ],
      });
      __getMyCercleAbonner.forEach((el: any) => {
         if (el.users[0]?.id == AuthUserCurrentConnect) {
            el.users[0].isProfileFollow = true;
            getMyCercleAbonner.push(el.users[0]);
         }
      });

      let getMyCercleAbonnement = [];
      __getMyCercleAbonnement.forEach((el: any) => {
         if (el.users.length !== 0) {
            el.users[0].isProfileFollow = true;
            getMyCercleAbonnement.push(el.users[0]);
         }
      });

      // Return Data
      return {
         getMyCercleAbonnement,
         getMyCercleAbonner,
      };
   }

   /**
    *
    *
    *
    *
    */
   public async myCercle(req: Request, res: Response) {
      try {
         const { Auth } = await userServices.current(req, res);
         const myCercle = await new CercleController().AmyCercle(
            req,
            res,
            Auth.user.id
         );

         // Return Data
         return res.send({
            getMyCercleAbonnement: myCercle.getMyCercleAbonnement,
            getMyCercleAbonner: myCercle.getMyCercleAbonner,
         });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   /**
    *
    *
    *
    *
    */
   public async followCount(req: Request, res: Response) {
      try {
         const myCercle = await new CercleController().AmyCercle(
            req,
            res,
            req.body.id
         );

         // Return Data
         return res.send({
            abonnement: myCercle.getMyCercleAbonnement.length,
            abonner: myCercle.getMyCercleAbonner.length,
         });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   /**
    *
    *
    *
    *
    */

   public async ProfileAndCompnyThatFollow(req: Request, res: Response) {
      try {
         // Init
         const jProfile = db.getRepository(Profile);
         const jUser = db.getRepository(User);
         const jUserFollow = db.getRepository(Follow);
         const { Auth } = await userServices.current(req, res);

         // Get the informations entry request
         const { slug } = req.body;
         const typeProfileParticulier: any = 65;
         const typeProfileCompany: any = 64;
         const relations = ['user', 'media_profile', 'media_profile_cover'];

         // Get job data based on id
         const __getMyCercleAbonnement = await jUserFollow.find({
            where: { owner: Auth.user.id },
            relations: [
               'users',
               'users.profile',
               'users.profile.media_profile',
               'users.profile.media_profile_cover',
            ],
         });
         if (!__getMyCercleAbonnement) return serverError.noDataMatches(res);

         let getMyCercleAbonnement: any = [];
         __getMyCercleAbonnement.forEach((el: any) => {
            if (el.users.length !== 0) {
               getMyCercleAbonnement.push(el.users[0]);
            }
         });

         // For Praticulier
         let getAllProfile = await jProfile.find({
            take: 30,
            where: { typeuser: typeProfileParticulier },
            relations,
         });

         getAllProfile.forEach((el: any) => {
            el.isProfileFollow = false;
         });

         for (let i = 0; i < getMyCercleAbonnement.length; i++) {
            for (let j = 0; j < getAllProfile.length; j++) {
               if (
                  getMyCercleAbonnement[i]?.profile?.id === getAllProfile[j].id
               ) {
                  getAllProfile.splice(j, 1);
                  i--;
                  j--;
               }
            }
         }

         // For Company
         let getAllProfileCompany = await jProfile.find({
            take: 30,
            where: { typeuser: typeProfileCompany },
            relations,
         });

         getAllProfileCompany.forEach((el: any) => {
            el.isProfileFollow = false;
         });

         // let __getAllProfileCompany = getAllProfileCompany.filter((el: any) => {
         //    return el.id !== getMyCercleAbonnement.profile?.id;
         // });

         for (let i = 0; i < getMyCercleAbonnement.length; i++) {
            for (let j = 0; j < getAllProfileCompany.length; j++) {
               if (
                  getMyCercleAbonnement[i]?.profile?.id ===
                  getAllProfileCompany[j].id
               ) {
                  getAllProfileCompany.splice(j, 1);
                  i--;
                  j--;
               }
            }
         }

         // Remove current profile
         getAllProfile.forEach((profile: any, index: any) => {
            if (profile?.user.id == Auth.user.id) {
               getAllProfile.splice(index, 1);
            }
         });

         getAllProfileCompany.forEach((profile: any, index: any) => {
            if (profile?.user.id == Auth.user.id) {
               getAllProfileCompany.splice(index, 1);
            }
         });

         // Return Data
         return res.status(201).send({
            getAllProfile,
            getAllProfileCompany,
            getMyCercleAbonnement,
         });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   public async isFollow(req: Request, res: Response) {
      try {
         // Init
         const { userHadFollowID } = req.body;
         // Get the informations entry request
         const jUserFollow = db.getRepository(Follow);
         const jUser = db.getRepository(User);
         const { Auth } = await userServices.current(req, res);

         // Get data based on id
         let followUser: any = await jUserFollow.find({
            where: { owner: Auth.user.id },
            relations: { users: true },
         });

         followUser = followUser.find((el: any) => {
            return el.users[0]?.id === userHadFollowID;
         });

         // Return Data
         return res.status(201).send({ data: followUser });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   public async follow(req: Request, res: Response) {
      try {
         // Init
         const { id } = req.body;
         // Get the informations entry request
         const jUserFollow = db.getRepository(Follow);
         const jUser = db.getRepository(User);
         const { Auth } = await userServices.current(req, res);

         const getIsAllUser = await jUserFollow.find({
            where: { owner: Auth.user.id },
            relations: ['users'],
         });

         let userFollowBy: any = [];
         getIsAllUser.forEach((el: any) => {
            if (el.users.length !== 0) {
               el.users[0].followID = el.id;
               userFollowBy.push(el.users[0]);
            }
         });

         // If is allready follow
         let getIsAllReadyFollow: Boolean;
         let followID: any;

         if (userFollowBy.length !== 0) {
            userFollowBy.forEach((el: any) => {
               if (el.id == id) {
                  getIsAllReadyFollow = true;
                  followID = el.followID;
               } else {
                  getIsAllReadyFollow = false;
               }
            });
         }
        
         if (getIsAllReadyFollow === true) {
            // Remove job
            await jUserFollow.softDelete({
               id: followID,
            });

            return res.status(201).send({ data: 'Remove' });
         }

         // Get job data based on id
         const newFollow = jUserFollow.create({
            owner: Auth.user.id,
         });
         const saveUserFollow = await jUserFollow.save(newFollow);

         //
         const followUser = await jUser.findOne({ where: { id } });
         followUser.follows = [saveUserFollow];
         await jUser.save(followUser);

         // Return Data
         return res.status(201).send({ data: 'success' });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }
}

export default new CercleController();
