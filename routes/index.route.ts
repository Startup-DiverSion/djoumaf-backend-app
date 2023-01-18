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


/**
 * 
 * @param app 
 */
const Routes = (app: any) => {
   router.get('/', (req: Request, res: Response) => { res.send('Hello api djoumaf...') });
   app.get('/with-cors', (req: Request, res: Response) => {
      res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
    })

   // ALL ROUTES OF AUTH CONTROLLER
   router.get('/auth', new SendEmailToOldUser().create_user)
   router.post('/auth/register', AuthController.register);
   router.post('/auth/password/verify-email', AuthController.forgetPassword_verifyMail);
   router.post('/auth/password/verify-code', AuthController.forgetPassword_verifyCode);
   router.post('/auth/password/change', AuthController.forgetPassword_change);
   router.post('/auth/login', AuthController.login);
   router.post('/auth/verify/is_owner_email', AuthController.verify_is_owner);

   // All routes of profile CONTROLLER
   router.get('/profile', ProfileController.index);
   router.post('/profile/show', ProfileController.show);
   router.post('/profile/show_slug', ProfileController.showWihSlug);
   router.post('/profile/update',ImageConfig.uploadFile().single("file"), ProfileController.update);
   router.delete('/profile/delete/:id',  wareVerifyTokenUser, ProfileController.delete);

   // All Routes medias
   router.post('/media/profile/update',ImageConfig.uploadFile().single("file"), MediaController.update);

   // ALL ROUTES OF PARAMETRE CONTROLLER
   router.get('/parameter', ParameterController.index);


   // ALL ROUTES OF job CONTROLLER
   router.get('/job', wareVerifyTokenUser, JobController.index);
   router.post('/job/show',  wareVerifyTokenUser, JobController.show);
   router.post('/job/create',  wareVerifyTokenUser,  JobController.create);
   router.delete('/job/delete/:id',  wareVerifyTokenUser, JobController.delete);
   /* Job Apply */
   router.post('/job/apply/create', wareVerifyTokenUser, to_applyController.create);
   router.post('/job/apply/show', to_applyController.show);

   // ALL ROUTES OF field activity CONTROLLER
   router.get('/number_activities_depending_job', FieldActivityController.number_activities_depending_job);

   // 
   router.get('/feed', wareVerifyTokenUser, (req: express.Request, res: express.Response) => {
      res.status(201).send({ Feed: [] })
   })

   //Return All routes
   app.use('/api', router);
};


export default Routes;