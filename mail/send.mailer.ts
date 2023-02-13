import { db } from '../database/index.database';
import { User } from '../models/user';
import { dataSelected } from '../oldUserDb';
import { Response, Request } from 'express';
import 'dotenv/config';
import useValidateError from '../utils/err/input.error';
import authValidator from '../utils/validators/auth.validator';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import authMailer from '../mail/auth.mailer';
import * as moment from 'moment';
import serverError from '../utils/err/server.error';
import { env } from '../config/env.config';
import profileController from './../controllers/profile.controller';
import { Role } from '../models/userRole';
import slugify from 'slugify';
import { Profile } from '../models/userProfile';
import mediaController from '../controllers/media.controller';
import { Media } from '../models/mediaUserProfile';
import { Preference } from '../models/userPreference';
import { Parameter } from '../models/parameter';

export class SendEmailToOldUser {
   public async create_user(req: Request, res: Response) {
      try {
         // GET FIELD TO SIGN UP USER
         let email: any;
         let signin_place: any;
         let device: any;
         let password: any = 'user-djoumaf-23';
         let type_user:any = '65';
         let description: any = 'bonjour';

         // Initialize the user profile
         const jProfile = db.getRepository(Profile);
         const jMedia = db.getRepository(Media);
         const jPreference = db.getRepository(Preference);
         const jParametre = db.getRepository(Parameter);

         for (let i = 0; i < dataSelected.data.length; i++) {
            const oldUser = dataSelected.data[i];
            
        
            email = oldUser.email;

            const suser = await db.getRepository(User).findOne({ where: { email } });


            if (suser?.email !== email) {
               // VERIFY IF USERNAME ALREADY EXISTS IN DATABASE
              
               let usernameExist: any;
               let username: any;
               do {
                  // Defined the letter associated
                  const letter = 'd j o u m a f'.split(' ');
                  const letterRamdom = Math.floor(
                     Math.random() * letter.length
                  );

                  // Defined the slug of profile
                  username = `${slugify('djoumaf', '_')}_${Math.floor(
                     Math.random() * 10000
                  )}${letter[letterRamdom]}`.toLowerCase();

                  usernameExist = await db
                     .getRepository(User)
                     .findOne({ where: { username } });
                  if (usernameExist)
                     return useValidateError.withoutInput(res, {
                        message: 'Username est dèja utiliser !',
                        path: 'email',
                     });
               } while (usernameExist);

               // VERIFY IF EMAIL ALREADY EXISTS IN DATABASE
               const emailExist = await db
                  .getRepository(User)
                  .findOne({ where: { email } });
               if (emailExist)
                  return useValidateError.withoutInput(res, {
                     message: "L'adresse email à déjà été pris",
                     path: 'email',
                  });

               // HASH THE PASSWORD
               const salt = await bcrypt.genSalt(10);
               const hashPassword = await bcrypt.hash(password, salt);

               // GENERATE A UNIQUE TOKEN
               const __RToken__ = jwt.sign({ _id: email }, env.SECRET_TOKEN);

               // Get Role
               const role = await db
                  .getRepository(Role)
                  .findOne({ where: { slug: 'dj_user' } });
               if (!role)
                  return serverError.noDataMatches(res, {
                     message: 'No existe in database',
                  });

               // CREATING THE NEW USER
               'sd'.toLowerCase();
               const newUser = db.getRepository(User).create({
                  username: username,
                  email: email.toLowerCase().trim(),
                  password: hashPassword,
                  token: __RToken__,
                  role: role,
                  signup_place: signin_place?.city
                     ? JSON.stringify(signin_place)
                     : null,
                  signin_place: signin_place?.city
                     ? JSON.stringify(signin_place)
                     : null,
                  device: device?.model ? JSON.stringify(device) : null,
                  verify_email_expire: moment
                     .utc()
                     .add(3, 'days')
                     .toISOString(),
               });

               const user = await db.getRepository(User).save(newUser);
               if (!user) return serverError.notInsertToDatabase(res);

               // Create profile
               const CreateProfile = await profileController.create(req, res);
               if (!CreateProfile) return serverError.notInsertToDatabase(res);

               if (CreateProfile) {
                  const full_name = oldUser.nom + ' ' + oldUser.prenoms;
                  let slugExist: any;
                  let slug: string;

                  do {
                     // Defined the letter associated
                     const letter = 'd j o u m a f'.split(' ');
                     const letterRamdom = Math.floor(
                        Math.random() * letter.length
                     );

                     // Defined the slug of profile
                     slug = `${slugify(full_name, '_')}_${Math.floor(
                        Math.random() * 10000
                     )}${letter[letterRamdom]}`.toLowerCase();

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
                  await mediaController.create(req, res, CreateProfile['id']);

                  // Add preference of profile
                  let preferenceID: any = [65, 40, 41];
                  for (let i = 0; i < preferenceID.length; i++) {
                     const el = preferenceID[i];

                     const parameter = await jParametre.findOne({
                        where: { id: el },
                        relations: { type_parameter: true },
                     });

                     const newPreference = jPreference.create({
                        parameter: el,
                        user: user,
                        parent: parameter.type_parameter,
                     });
                     const savePreference = await jPreference.save(
                        newPreference
                     );
                     if (!savePreference)
                        return serverError.notInsertToDatabase(res);

                     if (savePreference.parameter === type_user) {
                        type_user = savePreference;
                     }
                  }
                 

                  let updateProfile = db.getRepository(Profile).update(
                     { id: CreateProfile['id'] },
                     {
                        id: CreateProfile['id'],
                        first_name: oldUser.nom,
                        last_name: oldUser.prenoms,
                        type: type_user,
                        full_name,
                        description,
                        slug,
                        bio: 'test',
                        lvl: 1,
                     }
                  );
               }

               // Associate the profile to user
               const AssocciateProfileToUser = db
                  .getRepository(User)
                  .update({ id: newUser.id }, { profile: CreateProfile['id'] });
               if (!AssocciateProfileToUser)
                  return serverError.notInsertToDatabase(res);

               // Send email of verification
               await authMailer.sendMailToOldUser(
                  email,
                  password
               );

              
            }
         };


         res.send('Send')

      } catch (error) {
         return serverError.catchError(res, error);
      }
   }
}
