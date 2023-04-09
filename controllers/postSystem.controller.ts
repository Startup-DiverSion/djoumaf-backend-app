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
import { PostUserLike } from '../models/postUserLike';
import { Post } from '../models/posts';
import { PostUserDjoumer } from '../models/postUserDjoumer';

class PostSystemController {
   /**
    * Liker Post
    * @param req REQUEST
    * @param res RESPONSE
    * @returns JSON
    */

   public async createAndRemoveLike(req: Request, res: Response) {
      try {
         // Init
         const jLiker = db.getRepository(PostUserLike);
         const jPost = db.getRepository(Post);

         // Get the informations entry request
         const { postID, userID } = req.body;
         const { Auth } = await userServices.current(req, res);

         //    Verify is user to allready liked this post(PostID)
         const getIsAllJob: any = await jPost.findOne({
            where: { id: postID },
            relations: ['like.user', 'like.post'],
         });

         let getIsAllReadyLike: Boolean;

         if (getIsAllJob.like.length !== 0) {
            getIsAllJob.like.forEach((el: any) => {
               if (el.user.id == Auth.user.id && el.post.id == postID) {
                  getIsAllReadyLike = true;
               } else {
                  getIsAllReadyLike = false;
               }
            });
         }

         if (getIsAllReadyLike === true) {
            // Remove job
            await jLiker.delete({
               post: postID,
               user: Auth.user.id,
            });

            return res
               .status(201)
               .send({ post_user_like: 'Remove', getIsAllReadyLike });
         }

         // Get job data based on id
         const newLike = jLiker.create({
            post: postID,
            user: Auth.user.id,
         });

         const saveLike = await jLiker.save(newLike);

         // Return Data
         return res
            .status(201)
            .send({ post_user_like: saveLike, getIsAllReadyLike });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }



   /**
    * Djoumer Post
    * @param req REQUEST
    * @param res RESPONSE
    * @returns JSON
    */

   public async createAndRemoveDjoumer(req: Request, res: Response) {
      try {
         // Init
         const jDjoumer = db.getRepository(PostUserDjoumer);
         const jPost = db.getRepository(Post);

         // Get the informations entry request
         const { postID, userID } = req.body;
         const { Auth } = await userServices.current(req, res);

         //    Verify is user to allready liked this post(PostID)
         const getIsAllJob: any = await jPost.findOne({
            where: { id: postID },
            relations: ['djoumer.user', 'djoumer.post'],
         });

         let getIsAllReadyLike: Boolean;

         if (getIsAllJob.djoumer.length !== 0) {
            getIsAllJob.djoumer.forEach((el: any) => {
               if (el.user.id == Auth.user.id && el.post.id == postID) {
                  getIsAllReadyLike = true;
               } else {
                  getIsAllReadyLike = false;
               }
            });
         }

         if (getIsAllReadyLike === true) {
            // Remove job
            await jDjoumer.delete({
               post: postID,
               user: Auth.user.id,
            });

            return res.status(201).send({ post_user_djoumer: 'Remove' });
         }

         // Get job data based on id
         const newDjoumer = jDjoumer.create({
            post: postID,
            user: Auth.user.id,
         });

         const saveDjoumer = await jDjoumer.save(newDjoumer);

         // Return Data
         return res.status(201).send({ post_user_djoumer: saveDjoumer });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   /**
    * Comment Post
    * @param req REQUEST
    * @param res RESPONSE
    * @returns JSON
    */
   
}

export default new PostSystemController();
