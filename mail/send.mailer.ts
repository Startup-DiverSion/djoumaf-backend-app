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
import { env } from 'process';
import profileController from './../controllers/profile.controller';

export class SendEmailToOldUser {
   public async create_user(req: Request, res: Response) {
      try {
         // GET FIELD TO SIGN UP USER

         dataSelected.data.forEach(async(oldUser:any) => {
           

            // VERIFY IF EMAIL ALREADY EXISTS IN DATABASE
            const emailExist = await db
               .getRepository(User)
               .findOne({ where: { email: oldUser.email } });


            if (!emailExist) {
          

                // VERIFY IF USERNAME ALREADY EXISTS IN DATABASE
            let usernameExist: any;
            let username: any;
            do {
               username =
                  'djouma-by-africa-' + Math.floor(Math.random() * 10000);
               usernameExist = await db
                  .getRepository(User)
                  .findOne({ where: { username } });
               if (usernameExist)
                  return useValidateError.withoutInput(res, {
                     message: 'Username est dèja utiliser !',
                     path: 'email',
                  });
            } while (usernameExist);

               // HASH THE PASSWORD
               const salt = await bcrypt.genSalt(10);
               const hashPassword = await bcrypt.hash('s0//P4$$w0rD', salt);

               // GENERATE A UNIQUE TOKEN
               const __RToken__ = jwt.sign(
                  { _id: oldUser.email },
                  process.env.SECRET_TOKEN
               );

               // CREATING THE NEW USER
               const newUser = db.getRepository(User).create({
                  username: username,
                  email: oldUser.email,
                  password: hashPassword,
                  token: __RToken__,
               });

               const user = await db.getRepository(User).save(newUser);
               if (!user) return serverError.notInsertToDatabase(res);

               // Create profile
               const CreateProfile = await profileController.create(req, res);
               if (!CreateProfile) return serverError.notInsertToDatabase(res);

               // Associate the profile to user
               const AssocciateProfileToUser = db
                  .getRepository(User)
                  .update({ id: newUser.id }, { profile: CreateProfile['id'] });
               if (!AssocciateProfileToUser)
                  return serverError.notInsertToDatabase(res);

               // SUCESS CREATE NEW USER
               await authMailer.sendMailToOldUser(
                  oldUser.email,
                  's0//P4$$w0rD'
               );

               console.log('fait!')
            }
         });

        
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }
}
