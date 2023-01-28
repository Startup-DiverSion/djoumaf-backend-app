"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ware_verifyToken_1 = require("../middlewares/auth/ware.verifyToken");
var router = express.Router();
/**
 * IMPORT ALL CONTROLLERS
 */
var auth_controller_1 = require("../controllers/auth.controller");
var image_config_1 = require("../config/image.config");
var parameter_controller_1 = require("../controllers/parameter.controller");
var profile_controller_1 = require("../controllers/profile.controller");
var job_controller_1 = require("../controllers/job.controller");
var send_mailer_1 = require("../mail/send.mailer");
var field_activity_controller_1 = require("../controllers/field_activity.controller");
var to_apply_controller_1 = require("../controllers/to_apply.controller");
var media_controller_1 = require("../controllers/media.controller");
var talk_mail_controller_1 = require("../controllers/talk_mail.controller");
/**
 *
 * @param app
 */
var Routes = function (app) {
    router.get('/', function (req, res) { res.send('Hello api djoumaf...'); });
    app.get('/with-cors', function (req, res) {
        res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' });
    });
    // ALL ROUTES OF AUTH CONTROLLER
    router.get('/auth', new send_mailer_1.SendEmailToOldUser().create_user);
    router.post('/auth/register', auth_controller_1.default.register);
    router.post('/auth/password/verify-email', auth_controller_1.default.forgetPassword_verifyMail);
    router.post('/auth/password/verify-code', auth_controller_1.default.forgetPassword_verifyCode);
    router.post('/auth/password/change', auth_controller_1.default.forgetPassword_change);
    router.post('/auth/login', auth_controller_1.default.login);
    router.post('/auth/verify/is_owner_email', auth_controller_1.default.verify_is_owner);
    // All routes of profile CONTROLLER
    router.get('/profile', profile_controller_1.default.index);
    router.post('/profile/show', profile_controller_1.default.show);
    router.post('/profile/show_slug', profile_controller_1.default.showWihSlug);
    router.post('/profile/update', image_config_1.default.uploadFile().single("file"), profile_controller_1.default.update);
    router.delete('/profile/delete/:id', ware_verifyToken_1.wareVerifyTokenUser, profile_controller_1.default.delete);
    // All Routes medias
    router.post('/media/profile/update', image_config_1.default.uploadFile().single("file"), media_controller_1.default.update);
    // ALL ROUTES OF PARAMETRE CONTROLLER
    router.get('/parameter', parameter_controller_1.default.index);
    // ALL ROUTES OF job CONTROLLER
    router.get('/job', ware_verifyToken_1.wareVerifyTokenUser, job_controller_1.default.index);
    router.post('/job/show', ware_verifyToken_1.wareVerifyTokenUser, job_controller_1.default.show);
    router.post('/job/create', ware_verifyToken_1.wareVerifyTokenUser, job_controller_1.default.create);
    router.delete('/job/delete/:id', ware_verifyToken_1.wareVerifyTokenUser, job_controller_1.default.delete);
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
    router.get('/feed', ware_verifyToken_1.wareVerifyTokenUser, function (req, res) {
        res.status(201).send({ Feed: [] });
    });
    //Return All routes
    app.use('/api', router);
};
exports.default = Routes;
