import * as express from "express"
import { wareVerifyTokenUser } from "../middlewares/auth/ware.verifyToken";
const router = express.Router();
import { Response, Request } from 'express';

/**
 * IMPORT ALL CONTROLLERS
 */
import AuthController from '../controllers/auth.controller';
import ImageConfig from "../config/image.config";
import ParameterController from "../controllers/parameter.controller";
import ProfileController from "../controllers/profile.controller";
import JobController from "../controllers/job.controller";
import { SendEmailToOldUser } from "../mail/send.mailer";
import FieldActivityController from "../controllers/field_activity.controller";
import to_applyController from "../controllers/to_apply.controller";
import MediaController from "../controllers/media.controller";
import TalkMailController from "../controllers/talk_mail.controller";
import UserController from "../controllers/user.controller";
import ProfileExperienceController from "../controllers/profile.experience.controller";
import ProfileCourseController from "../controllers/profile.course.controller";
import activity_logController from "../controllers/activity_log.controller";


/**
 * 
 * @param app 
 */


const Routes = (app: any) => {
   router.get('/', (req: Request, res: Response) => { res.send('Hello api djoumaf...') });
   app.get('/with-cors', (req: Request, res: Response) => {
      res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
    })

    router.get('/test', activity_logController.index);

   // ALL ROUTES OF AUTH CONTROLLER
   // router.get('/auth', new SendEmailToOldUser().create_user)
   router.post('/auth/register', AuthController.register);
   router.post('/auth/password/verify-email', AuthController.forgetPassword_verifyMail);
   router.post('/auth/password/verify-code', AuthController.forgetPassword_verifyCode);
   router.post('/auth/password/change', AuthController.forgetPassword_change);
   router.post('/auth/login', AuthController.login);
   router.post('/auth/verify/is_owner_email', AuthController.verify_is_owner);

   // All routes of profile CONTROLLER
   router.get('/profile', ProfileController.index);
   router.get('/profile/particulier', ProfileController.particulier);
   router.post('/profile/show', ProfileController.show);
   router.post('/profile/show_slug', ProfileController.showWihSlug);
   router.post('/profile/update',wareVerifyTokenUser, ImageConfig.uploadFile().single("file"), ProfileController.update);
   router.post('/profile/edit',wareVerifyTokenUser, ProfileController.updateOfProfile);
   router.post('/profile/description/edit', wareVerifyTokenUser, ProfileController.updateDescription);
   router.delete('/profile/delete/:id',  wareVerifyTokenUser, ProfileController.delete);

   // All routes of profile : Cv Experience CONTROLLER
   router.post('/profile/experience', ProfileExperienceController.index);
   router.post('/profile/experience/create', wareVerifyTokenUser, ProfileExperienceController.create);
   router.post('/profile/experience/update', wareVerifyTokenUser, ProfileExperienceController.update);
   router.post('/profile/experience/delete', wareVerifyTokenUser, ProfileExperienceController.delete);

   // All routes of profile : Cv Course CONTROLLER
   router.post('/profile/course', ProfileCourseController.index);
   router.post('/profile/course/create', wareVerifyTokenUser, ProfileCourseController.create);
   router.post('/profile/course/update', wareVerifyTokenUser, ProfileCourseController.update);
   router.post('/profile/course/delete', wareVerifyTokenUser, ProfileCourseController.delete);

   // All routes : CANDIDACY
   router.post('/profile/candidacy/see', TalkMailController.candidacy_see_profile);
   router.post('/profile/candidacy/state', TalkMailController.candidacy_state);

   // All users
   router.get('/user', UserController.index);

   // All Routes medias
   router.post('/media/profile/update',ImageConfig.uploadFile().single("file"), MediaController.update);

   // ALL ROUTES OF PARAMETRE CONTROLLER
   router.get('/parameter', ParameterController.index);

   //Activity log
   router.get('/activity_log', wareVerifyTokenUser, activity_logController.index);


   // ALL ROUTES OF job CONTROLLER
   router.get('/job', JobController.index);
   router.post('/job/show', JobController.show);
   router.post('/job/create',  wareVerifyTokenUser,  JobController.create);
   router.post('/job/update',  wareVerifyTokenUser,  JobController.update);
   router.post('/job/delete',  wareVerifyTokenUser, JobController.delete);
   /* Job Apply */
   router.post('/job/apply/create', wareVerifyTokenUser, to_applyController.create);
   router.post('/job/apply/show', to_applyController.show);

   // ALL ROUTES OF field activity CONTROLLER
   router.get('/number_activities_depending_job', FieldActivityController.number_activities_depending_job);

   // All routes Talks Mail
   router.get('/talk/mails', TalkMailController.index);
   router.get('/talk/mails/dj', wareVerifyTokenUser, TalkMailController.indexInTermsOfUserConnected);
   router.get('/talk/mails/in', TalkMailController.allUserToSendEmail)

   // All routes Talks Chat Message
   router.get('/talk/messages', FieldActivityController.number_activities_depending_job);

   // 
   router.get('/feed', wareVerifyTokenUser, (req: express.Request, res: express.Response) => {
      res.status(201).send({ Feed: [] })
   })

   //Return All routes
   app.use('/api', router);
};


export default Routes;