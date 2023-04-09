import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { skills } from '../skills';
import { Media } from '../models/mediaUserProfile';
import { MediaCover } from '../models/mediaUserProfileCover';
import { env } from '../config/env.config';

class onActionController {
   constructor() {}

   // Media => Url //
   public async MediaProfileUrlToOriginalUrl(
      req: Request,
      res: Response,
      profileID: any
   ) {
      try {
         // Init
         const jMedia = db.getRepository(Media);
         const jMediaCover = db.getRepository(MediaCover);

         // Initialize the user profile

         const MediaUpdate = async (j: any) => {
            const __get = await jMedia.find();
            __get.forEach((el: any) => {
               if (el.url && !el.original_url) {
                  j.update(
                     { id: el.id },
                     {
                        original_url: env.HOST_CLIENT_IMAGE + '/' + el.url,
                     }
                  );
               }
            });
         };

         MediaUpdate(jMedia);
         MediaUpdate(jMediaCover);

        res.status(201).send({data: 'Fait'})
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new onActionController();
