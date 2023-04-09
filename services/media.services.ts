import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Media } from '../models/mediaUserProfile';
import { MediaCover } from '../models/mediaUserProfileCover';

class MediaService {
   public async profile(mediaID: any) {
      // Init
      const jMedia = db.getRepository(Media);

      //
      const getImageProfile = await jMedia.findOne({ where: { id: mediaID } });
      if (!getImageProfile) return { media_profile: null };


      return { media_profile: getImageProfile };
   }

   public async profileCover(mediaID: any) {
      // Init
      const jMediaCover = db.getRepository(MediaCover);

      //
      const getImageProfile = await jMediaCover.findOne({ where: { id: mediaID } });
      if (!getImageProfile) return { media_profile: null };

      return { media_profile_cover: getImageProfile };
   }
}

export default new MediaService();
