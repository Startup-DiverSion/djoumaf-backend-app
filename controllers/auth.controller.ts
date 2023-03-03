import { Response, Request } from 'express';
import 'dotenv/config';
import { User } from '../models/user';
import useValidateError from '../utils/err/input.error';
import authValidator from '../utils/validators/auth.validator';
import { db } from '../database/index.database';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import authMailer from '../mail/auth.mailer';
import * as moment from 'moment';
import serverError from '../utils/err/server.error';
import ProfileController from './profile.controller';
import { env } from '../config/env.config';
import profileController from './profile.controller';
import { Role } from '../models/userRole';
import clientError from '../utils/err/client.error';
import slugify from 'slugify';

class AuthController {
   constructor() {}

   /************************************************** 
      
         REGISTER A NEW USER 
 
      *************************************************/

   public async register(req: Request, res: Response) {
      try {
         // GET FIELD TO SIGN UP USER
         const { email, password, signin_place, device } = req.body;

         // VERIFY IF INFORMATIONS ENTER WAS BEEN REGISTER
         const { error } = authValidator.register(req.body);
         if (error) {
            return useValidateError.input(res, error);
         }

         // VERIFY IF USERNAME ALREADY EXISTS IN DATABASE
         let usernameExist: any;
         let username: any;
         do {
             // Defined the letter associated
             const letter = 'd j o u m a f'.split(' ')
             const letterRamdom = Math.floor(Math.random() * letter.length)
 
             // Defined the slug of profile
             username =  `${slugify('djoumaf', '_')}_${Math.floor(Math.random() * 10000)}${letter[letterRamdom]}`.toLowerCase();
 
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
        if(!role)  return serverError.noDataMatches(res, {
         message: 'No existe in database',
      });

         // CREATING THE NEW USER
         'sd'.toLowerCase()
         const newUser = db.getRepository(User).create({
            username: username,
            email: email.toLowerCase().trim(),
            password: hashPassword,
            token: __RToken__,
            role: role,
            signup_place: signin_place?.city ?  JSON.stringify(signin_place) : null,
            signin_place: signin_place?.city ?  JSON.stringify(signin_place) : null,
            device: device?.model ? JSON.stringify(device) : null,
            verify_email_expire: moment.utc().add(3, 'days').toISOString()
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

         // Send email of verification
         await authMailer.sendMailToVerifyAccount(email, username, __RToken__);

         // Return
         return res.status(201).json({ user, profile: CreateProfile });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }

   /************************************************** 
     
       ALLOW TO A USER 

     *************************************************/

   public async login(req: Request, res: Response) {
      try {
         // GET THE INPUT INFORMATION TO SIGN IN
         const { email, password } = req.body;

         // VERIFY IF INFORMATIONS ENTER WAS BEEN REGISTER
         const { error } = authValidator.login(req.body);
         if (error) {
            return useValidateError.input(res, error);
         }

         // VERIFY IF USERNAME ALREADY EXISTS IN DATABASE
         const user = await db
            .getRepository(User)
            .findOne({
               where: { email: email.toLowerCase().trim() },
               relations: { profile: true, preference: true },
            });
         if (!user)
            return useValidateError.withoutInput(res, {
               message: 'Email ou mot de password incorret',
               path: 'email',
            });

         // VERIFY IF PASSWORD IS VALIDE
         const isvalidPass = await bcrypt.compare(password, user.password);
         if (!isvalidPass)
            return useValidateError.withoutInput(res, {
               message: 'Email ou mot de password incorret',
               path: 'email',
            });

         res.send({ user });
      } catch (error) {
         console.log(error);
         return res.status(500).send(error);
      }
   }

   /************************************************** 
     
        VERIFY EMAIL AND SEND TO CHANGED PASSWORD
        SEND EMAIL WITH GENERATE CODE

     *************************************************/
   public async forgetPassword_verifyMail(req: Request, res: Response) {
      try {
         // I get the request to inform
         const { email } = req.body;

         // We verify is email exist in database
         const user = await db
            .getRepository(User)
            .findOne({ where: { email }, relations: {profile: true} });
         if (!user)
            return useValidateError.withoutInput(res, {
               message: "Ce email n'exist pas.",
               path: 'email',
            });

         // Generate a new  to differ code preceding
         let code: any;
         do {
            code = Math.floor(Math.random() * 99999);
            console.log(code === user.rest_password_code);
         } while (user.rest_password_code === code);

         // Update the code so that it is valid
         if (user.rest_password_code !== code) {
            const result = await db.getRepository(User).update(
               { email },
               {
                  verify_code_expire: moment().utc().add(30, 'minutes').toISOString(),
                  rest_password_code: code,
               }
            );
               console.log(email)
            if (result)
               await authMailer.sendMailTochangePassword(
                  email,
                  user.profile.full_name,
                  code
               );
         }

         res.status(201).send({ message: 'Email envoyer avec succès !' });
      } catch (error) {
         console.log(error);
      }
   }

   /************************************************** 
     
      VERIFY THE CODE TO PROVIDE FOR CHANGE PASSWORD

     *************************************************/
   public async forgetPassword_verifyCode(req: Request, res: Response) {
      try {
         // Init
         const xUser = db.getRepository(User);

         // Get information enter into request
         const { code, email } = req.body;

         // Verify if email is associate to user
         const codeToExist = await xUser.findOne({ where: { email } });
         if (
            (!codeToExist.rest_password_code &&
               codeToExist.rest_password_code !== code) ||
            codeToExist.rest_password_code !== code
         )
            return useValidateError.withoutInput(res, {
               message: "Ce code n'est plus disponible.",
               path: 'code',
            });

         // Verify if code is associate to user by email
         const isExpiredCode = moment(
            codeToExist.verify_code_expire
         ).diff(new Date());
         if (
            codeToExist.rest_password_code === code &&
            isExpiredCode < 0
         ) {
            return useValidateError.withoutInput(res, {
               message: 'Ce code à expirer.',
               path: 'code',
            });
         }

         return res
            .status(201)
            .send({ message: 'Votre code a été vérifier avec succès.' });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }

   /************************************************** 
     
        CHANGE PASSWORD

     *************************************************/
   public async forgetPassword_change(req: Request, res: Response) {
      try {
         // Init
         const xUser = db.getRepository(User);

         // Get request data
         let { email, code, old_password, new_password } = req.body;
         code = parseInt(code);

         // Search by email to change the password of user
         const qUser = xUser.findOne({
            where: { email },
         });
         if (!qUser)
            return useValidateError.withoutInput(res, {
               path: 'old_password',
               message: 'Email invalide.',
            });

         // Verify if email is associate to user
         const codeToExist = await xUser.findOne({ where: { email } });
         if (
            (!codeToExist.rest_password_code &&
               codeToExist.rest_password_code !== code) ||
            codeToExist.rest_password_code !== code
         )
            return useValidateError.withoutInput(res, {
               message: "Ce code n'est plus disponible.",
               path: 'code',
            });

         // Verify if code is associate to user by email
         const isExpiredCode = moment(
            codeToExist.verify_code_expire
         ).diff(new Date());
         if (
            codeToExist.rest_password_code === code &&
            isExpiredCode < 0
         ) {
            return useValidateError.withoutInput(res, {
               message: 'Ce code à expirer.',
               path: 'code',
            });
         }

         // HASH THE PASSWORD
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(new_password, salt);

         // Change password
         const qNewPassword = await xUser.update(
            { email },
            {
               password: hashPassword,
            }
         );
         if (!qNewPassword)
            return serverError.notInsertToDatabase(res, {
               message: "Une error c'est produite.",
            });
         if (qNewPassword)
            return await authMailer.sendMailToSuccessChangePassword(email);

         return res.status(201).send({
            qNewPassword,
            message: 'Votre mot de passe à été supprimer avec success.',
         });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }

   public async verify_is_owner(req: Request, res: Response) {
      try {
         // Init
         const xUser = db.getRepository(User);

         // Get request data
         let { token } = req.body;

         // Search by email to change the password of user
         const qUser = await xUser.findOne({
            where: { token },
         });
         if (!qUser)
            return useValidateError.withoutInput(res, {
               path: 'old_password',
               message: 'token invalide.',
            });

         // Verify if code is associate to user by email
         const isExpiredCode = moment(qUser.verify_email_expire).diff(
            new Date()
         );
         if (isExpiredCode < 0) {
            return useValidateError.withoutInput(res, {
               message: 'le link à expirer.',
               path: 'code',
            });
         }
         if(isExpiredCode > 0 && qUser.verify_email) return clientError.alreadyBeenExecuted(res)


         // Update the field verify token
         const updateUser = db.getRepository(User).update({id : qUser.id}, {
            verify_email: true
         })
         if(!updateUser) return serverError.notInsertToDatabase(res, {message: 'Cette information ne peut pas être mise à jour...'})



         return res.status(201).send({
            user: qUser,
            message: 'Votre compte à été valider avec success',
         });
      } catch (error) {
         return serverError.catchError(res, error);
      }
   }
}

export default new AuthController();
