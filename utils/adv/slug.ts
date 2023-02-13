import slugify from 'slugify';
import { db } from '../../database/index.database';
import useValidateError from './../../utils/err/input.error';

export const slugGetter = async (res: any, value: any, Model: any) => {
   let slugExist: any;
   let slug: string;

   do {
      // Defined the letter associated
      const letter = 'd j o u m a f'.split(' ');
      const letterRamdom = Math.floor(Math.random() * letter.length);

      // Defined the slug of profile
      slug = `${slugify(value, '_')}_${Math.floor(Math.random() * 10000)}${
         letter[letterRamdom]
      }`.toLowerCase();

      // Get profile
      slugExist = await db.getRepository(Model).findOne({ where: { slug } });
      if (slugExist) return { jSlug: null };
   } while (slugExist);

   //
   return { jSlug: slug };
};
