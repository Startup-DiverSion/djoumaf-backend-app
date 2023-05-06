import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { Post } from '../models/posts';
import userServices from '../services/user.services';
import { MediaPost } from '../models/mediaPost';
import { env } from '../config/env.config';
import { slugGetter } from './../utils/adv/slug';
import activity_logController from './activity_log.controller';

class PostController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
         // init
         const query: any = req.query;

         // Initialize
         const jPosts = db.getRepository(Post);
         const { Auth } = await userServices.current(req, res);

         // starting
         const getPostAll = await jPosts.find({
            relations: [
               'user',
               'user.profile',
               'user.profile.media_profile',
               'user.follows',
               'user.follows.users',
               'media',
               'like',
               'like.user',
               'like.post',
               'djoumer',
               'djoumer.user',
               'djoumer.post',
               'comments',
               'comments.post',
               'comments.user',
               'comments.user.profile',
               'comments.user.profile.media_profile',
            ],
         });
         getPostAll.forEach((post: any) => {
            // Verify if user to already liked post
            const isAlReadyLikedPost = post.like.find((el: any) => {
               return el.user.id == Auth.user.id && el.post.id == post.id;
            });

            const isAlReadyDjoumerPost = post.djoumer.find((el: any) => {
               return el.user.id == Auth.user.id && el.post.id == post.id;
            });

            const isAlReadyCommentPost = post.comments.find((el: any) => {
               return el.user.id == Auth.user.id && el.post.id == post.id;
            });

            // Count
            post.like_count = post.like.length;
            post.djoumer_count = post.djoumer.length;
            post.comment_count = post.comments.length;

            post.is_liked = isAlReadyLikedPost ? true : null;
            post.is_djoumer = isAlReadyDjoumerPost ? true : null;
            post.is_comments = isAlReadyCommentPost ? true : null;

            if (post.user.follows) {
               const IsCurrentUserFollow = post.user.follows.filter(
                  (e: any) => {
                     return e.owner == Auth.user.id;
                  }
               );
               if (IsCurrentUserFollow.length !== 0) {
                  post.user.isProfileFollow = true;
               } else {
                  post.user.isProfileFollow = false;
               }
            } else {
               post.user.isProfileFollow = false;
            }
         });
         return res.send({ posts: getPostAll });
      } catch (error) {
         serverError.catchError(res, error);
         console.log(error);
      }
   }

   //
   public async indexQuery(req: Request, res: Response) {
      try {
         const query: any = req.query.type_parametre;

         // if(!query) return useValidateError.withoutInput(res)

         const xParametre = await db
            .getRepository(Parameter)
            .find({ relations: { type_parameter: true } });

         return res.send({ parameter: xParametre });
      } catch (error) {
         console.log(error);
      }
   }

   //
   public async show(req: Request, res: Response) {
      try {
         // init
         const { slug } = req.body;

         // Initialize
         const jPost = db.getRepository(Post);
         const { Auth } = await userServices.current(req, res);

         // starting
         const getPost :any = await jPost.findOne({
            where: { slug },
            relations: [
               'user',
               'user.profile',
               'user.profile.media_profile',
               'user.follows',
               'user.follows.users',
               'media',
               'like.user',
               'like.post',
               'djoumer.user',
               'djoumer.post',
               'comments',
               'comments.post',
               'comments.user',
               'comments.user.profile',
               'comments.user.profile.media_profile',
            ],
         });

         const isAlReadyLikedPost = getPost.like.find((el: any) => {
            return el.user.id == Auth.user.id && el.post.id == getPost.id;
         });

         getPost.like_count = getPost.like.length;
         getPost.is_liked = isAlReadyLikedPost ? true : null;
         

         const isAlReadyDjoumerPost = getPost.djoumer.find((el: any) => {
            return el.user.id == Auth.user.id && el.post.id == getPost.id;
         });

         getPost.djoumer_count = getPost.djoumer.length;
         getPost.is_djoumer = isAlReadyDjoumerPost ? true : null;

         const isAlReadyCommentPost = getPost.comments.find((el: any) => {
            return el.user.id == Auth.user.id && el.post.id == getPost.id;
            });

            getPost.comment_count = getPost.comments.length;
         getPost.is_comment = isAlReadyCommentPost ? true : null;

         return res.send({ post: getPost });
      } catch (error) {
         serverError.catchError(res, error);
         console.log(error);
      }
   }

   //
   public async create(req: Request, res: Response, profileID: any) {
      try {
         // Init
         const { description, place, device } = req.body;
         const { Auth } = await userServices.current(req, res);

         // Initialize
         const jPost = db.getRepository(Post);
         const jMedia = db.getRepository(MediaPost);

         const { jSlug } = await slugGetter(res, 'poster_feed', Post);

         const newPost: any = jPost.create({
            description,
            slug: jSlug,
            place,
            device,
            user: Auth.user.id,
         });

         const savePost = await jPost.save(newPost);

         if (savePost) {
            if (req.files) {
               const files:any = req?.files?.length
               for (let i = 0; i < files; i++) {
                  const file = req.files[i];
                  const newMedia = jMedia.create({
                     url: file.filename,
                     original_url: env.HOST_CLIENT_IMAGE + '/' + file.filename,
                     type: file.mimetype,
                     media_post: savePost.id,
                  });
                  const saveMedia = await jMedia.save(newMedia);
               }

               const ActivityLog = await activity_logController.create(
                  req,
                  res,
                  {
                     title: description.substring(0, 30),   
                     tag: 'Publication',
                     type: 'post',
                     source: '/feeds/detail/' + jSlug,
                     source_id: savePost.id,
                  }
               );
            }
         }

         return res.status(201).send({ post: savePost });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new PostController();
