"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
const router = express.Router();
/**
 * IMPORT ALL CONTROLLERS
 */
const auth_controller_1 = require("../controllers/auth.controller");
const image_config_1 = require("../config/image.config");
const parameter_controller_1 = require("../controllers/parameter.controller");
const profile_controller_1 = require("../controllers/profile.controller");
const job_controller_1 = require("../controllers/job.controller");
const field_activity_controller_1 = require("../controllers/field_activity.controller");
const to_apply_controller_1 = require("../controllers/to_apply.controller");
const media_controller_1 = require("../controllers/media.controller");
const talk_mail_controller_1 = require("../controllers/talk_mail.controller");
const user_controller_1 = require("../controllers/user.controller");
const profile_experience_controller_1 = require("../controllers/profile.experience.controller");
const profile_course_controller_1 = require("../controllers/profile.course.controller");
const activity_log_controller_1 = require("../controllers/activity_log.controller");
/**
 *
 * @param app
 */
const Routes = (app) => {
    router.get('/', (req, res) => { res.send('Hello api djoumaf...'); });
    app.get('/with-cors', (req, res) => {
        res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' });
    });
    router.get('/test', activity_log_controller_1.default.index);
    // ALL ROUTES OF AUTH CONTROLLER
    // router.get('/auth', new SendEmailToOldUser().create_user)
    router.post('/auth/register', auth_controller_1.default.register);
    router.post('/auth/password/verify-email', auth_controller_1.default.forgetPassword_verifyMail);
    router.post('/auth/password/verify-code', auth_controller_1.default.forgetPassword_verifyCode);
    router.post('/auth/password/change', auth_controller_1.default.forgetPassword_change);
    router.post('/auth/login', auth_controller_1.default.login);
    router.post('/auth/verify/is_owner_email', auth_controller_1.default.verify_is_owner);
    // All routes of profile CONTROLLER
    router.get('/profile', profile_controller_1.default.index);
    router.get('/profile/particulier', profile_controller_1.default.particulier);
    router.post('/profile/show', profile_controller_1.default.show);
    router.post('/profile/show_slug', profile_controller_1.default.showWihSlug);
    router.post('/profile/update', ware_verifyToken_1.wareVerifyTokenUser, image_config_1.default.uploadFile().single("file"), profile_controller_1.default.update);
    router.post('/profile/edit', ware_verifyToken_1.wareVerifyTokenUser, profile_controller_1.default.updateOfProfile);
    router.post('/profile/description/edit', ware_verifyToken_1.wareVerifyTokenUser, profile_controller_1.default.updateDescription);
    router.delete('/profile/delete/:id', ware_verifyToken_1.wareVerifyTokenUser, profile_controller_1.default.delete);
    // All routes of profile : Cv Experience CONTROLLER
    router.post('/profile/experience', profile_experience_controller_1.default.index);
    router.post('/profile/experience/create', ware_verifyToken_1.wareVerifyTokenUser, profile_experience_controller_1.default.create);
    router.post('/profile/experience/update', ware_verifyToken_1.wareVerifyTokenUser, profile_experience_controller_1.default.update);
    router.post('/profile/experience/delete', ware_verifyToken_1.wareVerifyTokenUser, profile_experience_controller_1.default.delete);
    // All routes of profile : Cv Course CONTROLLER
    router.post('/profile/course', profile_course_controller_1.default.index);
    router.post('/profile/course/create', ware_verifyToken_1.wareVerifyTokenUser, profile_course_controller_1.default.create);
    router.post('/profile/course/update', ware_verifyToken_1.wareVerifyTokenUser, profile_course_controller_1.default.update);
    router.post('/profile/course/delete', ware_verifyToken_1.wareVerifyTokenUser, profile_course_controller_1.default.delete);
    // All routes : CANDIDACY
    router.post('/profile/candidacy/see', talk_mail_controller_1.default.candidacy_see_profile);
    router.post('/profile/candidacy/state', talk_mail_controller_1.default.candidacy_state);
    // All users
    router.get('/user', user_controller_1.default.index);
    // All Routes medias
    router.post('/media/profile/update', image_config_1.default.uploadFile().single("file"), media_controller_1.default.update);
    // ALL ROUTES OF PARAMETRE CONTROLLER
    router.get('/parameter', parameter_controller_1.default.index);
    //Activity log
    router.get('/activity_log', ware_verifyToken_1.wareVerifyTokenUser, activity_log_controller_1.default.index);
    // ALL ROUTES OF job CONTROLLER
    router.get('/job', job_controller_1.default.index);
    router.post('/job/show', job_controller_1.default.show);
    router.post('/job/create', ware_verifyToken_1.wareVerifyTokenUser, job_controller_1.default.create);
    router.post('/job/update', ware_verifyToken_1.wareVerifyTokenUser, job_controller_1.default.update);
    router.post('/job/delete', ware_verifyToken_1.wareVerifyTokenUser, job_controller_1.default.delete);
    /* Job Apply */
    router.post('/job/apply/create', ware_verifyToken_1.wareVerifyTokenUser, to_apply_controller_1.default.create);
    router.post('/job/apply/show', to_apply_controller_1.default.show);
    // ALL ROUTES OF field activity CONTROLLER
    router.get('/number_activities_depending_job', field_activity_controller_1.default.number_activities_depending_job);
    // All routes Talks Mail
    router.get('/talk/mails', talk_mail_controller_1.default.index);
    router.get('/talk/mails/dj', ware_verifyToken_1.wareVerifyTokenUser, talk_mail_controller_1.default.indexInTermsOfUserConnected);
    router.get('/talk/mails/in', talk_mail_controller_1.default.allUserToSendEmail);
    // All routes Talks Chat Message
    router.get('/talk/messages', field_activity_controller_1.default.number_activities_depending_job);
    // 
    router.get('/feed', ware_verifyToken_1.wareVerifyTokenUser, (req, res) => {
        res.status(201).send({ Feed: [] });
    });
    //Return All routes
    app.use('/api', router);
};
exports.default = Routes;
