import { Request, Response } from 'express';
import * as ejs from 'ejs';
import * as path from 'path';
import { mailConfiguration } from '../config/mailer.config';
import { Code } from 'typeorm';
import { env } from '../config/env.config';

class AuthMailer {
   constructor() {}

   public async sendMailToVerifyAccount(
      receivers: string | Array<string>,
      usernane: string,
      token: string
   ) {
      try {
         const data = {
            firstName: usernane,
            confirm_link: env.HOST_CLIENT + `/auth/sign-validate-account?token=${token}`,
         };
        
         ejs.renderFile(
            path.join(__dirname, '../templates/auth/account.view.ejs'),
            data
         ).then((result) => {
            mailConfiguration(
               receivers,
               '[DJOUMAF] Comfirmez votre adresse email',
               result
            );
         });
      } catch (error) {
         console.log(error);
      }
   }

   public async sendMailToOldUser(
      receivers: string | Array<string>,
      password: string
   ) {
      try {
         const data = {
            confirm_link: 'https://unlayer.com/',
            password,
            email: receivers,
         };

         ejs.renderFile(
            path.join(__dirname, '../templates/auth/send_email_old_user.ejs'),
            data
         ).then((result) => {
            mailConfiguration(
               receivers,
               '[DJOUMAF] Comfirmez votre adresse email',
               result
            );
         });
      } catch (error) {
         console.log(error);
      }
   }

   public async sendMailTochangePassword(
      receivers: string | Array<string>,
      fullName: string,
      code: Number
   ) {
      try {
         const data = {
            fullName: fullName,
            email: receivers,
            code: code,
            rest_password: 'https://unlayer.com/',
         };

         ejs.renderFile(
            path.join(__dirname, '../templates/auth/password_sm.view.ejs'),
            data
         ).then((result) => {
            mailConfiguration(
               receivers,
               '[DJOUMAF] Réinitialiser votre mot de passe',
               result
            );
         });
      } catch (error) {
         console.log(error);
      }
   }

   public async sendMailToSuccessChangePassword(
      receivers: string | Array<string>
   ) {
      try {
         const data = {
            email: receivers,
         };

         ejs.renderFile(
            path.join(__dirname, '../templates/auth/success.view.ejs'),
            data
         ).then((result) => {
            mailConfiguration(
               receivers,
               '[DJOUMAF] Mot de passe Réinitialiser avec succès.',
               result
            );
         });
      } catch (error) {
         console.log(error);
      }
   }
}

export default new AuthMailer();
