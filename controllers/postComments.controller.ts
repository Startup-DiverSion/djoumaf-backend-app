import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import userServices from '../services/user.services';
import { PostComments } from '../models/postComments';
import { Post } from '../models/posts';

class PostCommentController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
         // Init
         const { postID } = req.body;
         const { Auth } = await userServices.current(req, res);

         // Initialize the user profile
         const jPostComment = db.getRepository(PostComments);

         return res.send({});
      } catch (error) {
         console.log(error);
      }
   }

   //
   public async show(req: Request, res: Response) {}

   //
   public async create(req: Request, res: Response) {
      try {
         // Init
         const { message, postID } = req.body;
         const { Auth } = await userServices.current(req, res);

         // Initialize the user profile
         const jPostComment = db.getRepository(PostComments);
         const jPosts = db.getRepository(Post);

         const newPostComment = jPostComment.create({
            message,
            post: postID,
            user: Auth.user.id,
         });

         const savePostComment: any = await jPostComment.save(newPostComment);
         const getCurrentComment :any = await jPostComment.findOne({
            where: { id: savePostComment.id },
            relations: ['user', 'user.profile', 'user.profile.media_profile'],
         });

         getCurrentComment.is_comments = true

         res.status(201).send({ comment: getCurrentComment });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new PostCommentController();
