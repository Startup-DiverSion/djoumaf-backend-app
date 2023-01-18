import { Request, Response } from 'express';
import { db } from '../database/index.database';
import serverError from '../utils/err/server.error';
import { Media } from '../models/mediaUserProfile';
import { MediaCover } from './../models/mediaUserProfileCover';

class MediaController {
   //
   public async index(req: Request, res: Response) {
      try {
         return res.send({});
      } catch (error) {
         console.log(error);
      }
   }

   //
   public async show(req: Request, res: Response) {}

   //
   public async create(req: Request, res: Response, profileID: any) {
      try {
         // Init

         // Initialize the user profile
         const jMedia = db.getRepository(Media);
         const jMediaCover = db.getRepository(MediaCover);

         //  Media
         const newMedia = jMedia.create({
            url: req.file,
            profile: profileID,
         });
         const saveMedia = await jMedia.save(newMedia);
         if (!saveMedia) return serverError.notInsertToDatabase(res);

         //  Media Cover
         const newMediaCover = jMediaCover.create({
            url: req.file,
            profile: profileID,
         });
         const saveMediaCover = await jMediaCover.save(newMediaCover);
         if (!saveMediaCover) return serverError.notInsertToDatabase(res);
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {
      try {
         // Init
         const { id, type } = req.body;

         // Initialize the user profile
         let jMedia: any;

         if (type === 'profile') {
            jMedia = db.getRepository(Media);
         } else if (type === 'cover') {
            jMedia = db.getRepository(MediaCover);
         } else {
            return serverError.notInsertToDatabase(res);
         }

         console.log(req.files, req.file);
         //
         const updateMedia = jMedia.update(
            { profile: id },
            {
               url: req.file,
               profile: id,
            }
         );
         if (!updateMedia) return serverError.notInsertToDatabase(res);

         return res.send({ media_profile: true });
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async delete(req: Request, res: Response) {}
}

export default new MediaController();
