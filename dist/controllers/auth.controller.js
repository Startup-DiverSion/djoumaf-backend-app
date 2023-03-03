"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const user_1 = require("../models/user");
const input_error_1 = require("../utils/err/input.error");
const auth_validator_1 = require("../utils/validators/auth.validator");
const index_database_1 = require("../database/index.database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth_mailer_1 = require("../mail/auth.mailer");
const moment = require("moment");
const server_error_1 = require("../utils/err/server.error");
const env_config_1 = require("../config/env.config");
const profile_controller_1 = require("./profile.controller");
const userRole_1 = require("../models/userRole");
const client_error_1 = require("../utils/err/client.error");
const slugify_1 = require("slugify");
class AuthController {
    constructor() { }
    /**************************************************
       
          REGISTER A NEW USER
  
       *************************************************/
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // GET FIELD TO SIGN UP USER
                const { email, password, signin_place, device } = req.body;
                // VERIFY IF INFORMATIONS ENTER WAS BEEN REGISTER
                const { error } = auth_validator_1.default.register(req.body);
                if (error) {
                    return input_error_1.default.input(res, error);
                }
                // VERIFY IF USERNAME ALREADY EXISTS IN DATABASE
                let usernameExist;
                let username;
                do {
                    // Defined the letter associated
                    const letter = 'd j o u m a f'.split(' ');
                    const letterRamdom = Math.floor(Math.random() * letter.length);
                    // Defined the slug of profile
                    username = `${(0, slugify_1.default)('djoumaf', '_')}_${Math.floor(Math.random() * 10000)}${letter[letterRamdom]}`.toLowerCase();
                    usernameExist = yield index_database_1.db
                        .getRepository(user_1.User)
                        .findOne({ where: { username } });
                    if (usernameExist)
                        return input_error_1.default.withoutInput(res, {
                            message: 'Username est dèja utiliser !',
                            path: 'email',
                        });
                } while (usernameExist);
                // VERIFY IF EMAIL ALREADY EXISTS IN DATABASE
                const emailExist = yield index_database_1.db
                    .getRepository(user_1.User)
                    .findOne({ where: { email } });
                if (emailExist)
                    return input_error_1.default.withoutInput(res, {
                        message: "L'adresse email à déjà été pris",
                        path: 'email',
                    });
                // HASH THE PASSWORD
                const salt = yield bcrypt.genSalt(10);
                const hashPassword = yield bcrypt.hash(password, salt);
                // GENERATE A UNIQUE TOKEN
                const __RToken__ = jwt.sign({ _id: email }, env_config_1.env.SECRET_TOKEN);
                // Get Role
                const role = yield index_database_1.db
                    .getRepository(userRole_1.Role)
                    .findOne({ where: { slug: 'dj_user' } });
                if (!role)
                    return server_error_1.default.noDataMatches(res, {
                        message: 'No existe in database',
                    });
                // CREATING THE NEW USER
                'sd'.toLowerCase();
                const newUser = index_database_1.db.getRepository(user_1.User).create({
                    username: username,
                    email: email.toLowerCase().trim(),
                    password: hashPassword,
                    token: __RToken__,
                    role: role,
                    signup_place: (signin_place === null || signin_place === void 0 ? void 0 : signin_place.city) ? JSON.stringify(signin_place) : null,
                    signin_place: (signin_place === null || signin_place === void 0 ? void 0 : signin_place.city) ? JSON.stringify(signin_place) : null,
                    device: (device === null || device === void 0 ? void 0 : device.model) ? JSON.stringify(device) : null,
                    verify_email_expire: moment.utc().add(3, 'days').toISOString()
                });
                const user = yield index_database_1.db.getRepository(user_1.User).save(newUser);
                if (!user)
                    return server_error_1.default.notInsertToDatabase(res);
                // Create profile
                const CreateProfile = yield profile_controller_1.default.create(req, res);
                if (!CreateProfile)
                    return server_error_1.default.notInsertToDatabase(res);
                // Associate the profile to user
                const AssocciateProfileToUser = index_database_1.db
                    .getRepository(user_1.User)
                    .update({ id: newUser.id }, { profile: CreateProfile['id'] });
                if (!AssocciateProfileToUser)
                    return server_error_1.default.notInsertToDatabase(res);
                // Send email of verification
                yield auth_mailer_1.default.sendMailToVerifyAccount(email, username, __RToken__);
                // Return
                return res.status(201).json({ user, profile: CreateProfile });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
    /**************************************************
      
        ALLOW TO A USER
 
      *************************************************/
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // GET THE INPUT INFORMATION TO SIGN IN
                const { email, password } = req.body;
                // VERIFY IF INFORMATIONS ENTER WAS BEEN REGISTER
                const { error } = auth_validator_1.default.login(req.body);
                if (error) {
                    return input_error_1.default.input(res, error);
                }
                // VERIFY IF USERNAME ALREADY EXISTS IN DATABASE
                const user = yield index_database_1.db
                    .getRepository(user_1.User)
                    .findOne({
                    where: { email: email.toLowerCase().trim() },
                    relations: { profile: true, preference: true },
                });
                if (!user)
                    return input_error_1.default.withoutInput(res, {
                        message: 'Email ou mot de password incorret',
                        path: 'email',
                    });
                // VERIFY IF PASSWORD IS VALIDE
                const isvalidPass = yield bcrypt.compare(password, user.password);
                if (!isvalidPass)
                    return input_error_1.default.withoutInput(res, {
                        message: 'Email ou mot de password incorret',
                        path: 'email',
                    });
                res.send({ user });
            }
            catch (error) {
                console.log(error);
                return res.status(500).send(error);
            }
        });
    }
    /**************************************************
      
         VERIFY EMAIL AND SEND TO CHANGED PASSWORD
         SEND EMAIL WITH GENERATE CODE
 
      *************************************************/
    forgetPassword_verifyMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // I get the request to inform
                const { email } = req.body;
                // We verify is email exist in database
                const user = yield index_database_1.db
                    .getRepository(user_1.User)
                    .findOne({ where: { email }, relations: { profile: true } });
                if (!user)
                    return input_error_1.default.withoutInput(res, {
                        message: "Ce email n'exist pas.",
                        path: 'email',
                    });
                // Generate a new  to differ code preceding
                let code;
                do {
                    code = Math.floor(Math.random() * 99999);
                    console.log(code === user.rest_password_code);
                } while (user.rest_password_code === code);
                // Update the code so that it is valid
                if (user.rest_password_code !== code) {
                    const result = yield index_database_1.db.getRepository(user_1.User).update({ email }, {
                        verify_code_expire: moment().utc().add(30, 'minutes').toISOString(),
                        rest_password_code: code,
                    });
                    console.log(email);
                    if (result)
                        yield auth_mailer_1.default.sendMailTochangePassword(email, user.profile.full_name, code);
                }
                res.status(201).send({ message: 'Email envoyer avec succès !' });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    /**************************************************
      
       VERIFY THE CODE TO PROVIDE FOR CHANGE PASSWORD
 
      *************************************************/
    forgetPassword_verifyCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const xUser = index_database_1.db.getRepository(user_1.User);
                // Get information enter into request
                const { code, email } = req.body;
                // Verify if email is associate to user
                const codeToExist = yield xUser.findOne({ where: { email } });
                if ((!codeToExist.rest_password_code &&
                    codeToExist.rest_password_code !== code) ||
                    codeToExist.rest_password_code !== code)
                    return input_error_1.default.withoutInput(res, {
                        message: "Ce code n'est plus disponible.",
                        path: 'code',
                    });
                // Verify if code is associate to user by email
                const isExpiredCode = moment(codeToExist.verify_code_expire).diff(new Date());
                if (codeToExist.rest_password_code === code &&
                    isExpiredCode < 0) {
                    return input_error_1.default.withoutInput(res, {
                        message: 'Ce code à expirer.',
                        path: 'code',
                    });
                }
                return res
                    .status(201)
                    .send({ message: 'Votre code a été vérifier avec succès.' });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
    /**************************************************
      
         CHANGE PASSWORD
 
      *************************************************/
    forgetPassword_change(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const xUser = index_database_1.db.getRepository(user_1.User);
                // Get request data
                let { email, code, old_password, new_password } = req.body;
                code = parseInt(code);
                // Search by email to change the password of user
                const qUser = xUser.findOne({
                    where: { email },
                });
                if (!qUser)
                    return input_error_1.default.withoutInput(res, {
                        path: 'old_password',
                        message: 'Email invalide.',
                    });
                // Verify if email is associate to user
                const codeToExist = yield xUser.findOne({ where: { email } });
                if ((!codeToExist.rest_password_code &&
                    codeToExist.rest_password_code !== code) ||
                    codeToExist.rest_password_code !== code)
                    return input_error_1.default.withoutInput(res, {
                        message: "Ce code n'est plus disponible.",
                        path: 'code',
                    });
                // Verify if code is associate to user by email
                const isExpiredCode = moment(codeToExist.verify_code_expire).diff(new Date());
                if (codeToExist.rest_password_code === code &&
                    isExpiredCode < 0) {
                    return input_error_1.default.withoutInput(res, {
                        message: 'Ce code à expirer.',
                        path: 'code',
                    });
                }
                // HASH THE PASSWORD
                const salt = yield bcrypt.genSalt(10);
                const hashPassword = yield bcrypt.hash(new_password, salt);
                // Change password
                const qNewPassword = yield xUser.update({ email }, {
                    password: hashPassword,
                });
                if (!qNewPassword)
                    return server_error_1.default.notInsertToDatabase(res, {
                        message: "Une error c'est produite.",
                    });
                if (qNewPassword)
                    return yield auth_mailer_1.default.sendMailToSuccessChangePassword(email);
                return res.status(201).send({
                    qNewPassword,
                    message: 'Votre mot de passe à été supprimer avec success.',
                });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
    verify_is_owner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const xUser = index_database_1.db.getRepository(user_1.User);
                // Get request data
                let { token } = req.body;
                // Search by email to change the password of user
                const qUser = yield xUser.findOne({
                    where: { token },
                });
                if (!qUser)
                    return input_error_1.default.withoutInput(res, {
                        path: 'old_password',
                        message: 'token invalide.',
                    });
                // Verify if code is associate to user by email
                const isExpiredCode = moment(qUser.verify_email_expire).diff(new Date());
                if (isExpiredCode < 0) {
                    return input_error_1.default.withoutInput(res, {
                        message: 'le link à expirer.',
                        path: 'code',
                    });
                }
                if (isExpiredCode > 0 && qUser.verify_email)
                    return client_error_1.default.alreadyBeenExecuted(res);
                // Update the field verify token
                const updateUser = index_database_1.db.getRepository(user_1.User).update({ id: qUser.id }, {
                    verify_email: true
                });
                if (!updateUser)
                    return server_error_1.default.notInsertToDatabase(res, { message: 'Cette information ne peut pas être mise à jour...' });
                return res.status(201).send({
                    user: qUser,
                    message: 'Votre compte à été valider avec success',
                });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
}
exports.default = new AuthController();
