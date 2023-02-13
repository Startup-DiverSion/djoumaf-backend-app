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
exports.SendEmailToOldUser = void 0;
const index_database_1 = require("../database/index.database");
const user_1 = require("../models/user");
const oldUserDb_1 = require("../oldUserDb");
require("dotenv/config");
const input_error_1 = require("../utils/err/input.error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth_mailer_1 = require("../mail/auth.mailer");
const moment = require("moment");
const server_error_1 = require("../utils/err/server.error");
const env_config_1 = require("../config/env.config");
const profile_controller_1 = require("./../controllers/profile.controller");
const userRole_1 = require("../models/userRole");
const slugify_1 = require("slugify");
const userProfile_1 = require("../models/userProfile");
const media_controller_1 = require("../controllers/media.controller");
const mediaUserProfile_1 = require("../models/mediaUserProfile");
const userPreference_1 = require("../models/userPreference");
const parameter_1 = require("../models/parameter");
class SendEmailToOldUser {
    create_user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // GET FIELD TO SIGN UP USER
                let email;
                let signin_place;
                let device;
                let password = 'user-djoumaf-23';
                let type_user = '65';
                let description = 'bonjour';
                // Initialize the user profile
                const jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                const jMedia = index_database_1.db.getRepository(mediaUserProfile_1.Media);
                const jPreference = index_database_1.db.getRepository(userPreference_1.Preference);
                const jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                for (let i = 0; i < oldUserDb_1.dataSelected.data.length; i++) {
                    const oldUser = oldUserDb_1.dataSelected.data[i];
                    email = oldUser.email;
                    const suser = yield index_database_1.db.getRepository(user_1.User).findOne({ where: { email } });
                    if ((suser === null || suser === void 0 ? void 0 : suser.email) !== email) {
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
                            signup_place: (signin_place === null || signin_place === void 0 ? void 0 : signin_place.city)
                                ? JSON.stringify(signin_place)
                                : null,
                            signin_place: (signin_place === null || signin_place === void 0 ? void 0 : signin_place.city)
                                ? JSON.stringify(signin_place)
                                : null,
                            device: (device === null || device === void 0 ? void 0 : device.model) ? JSON.stringify(device) : null,
                            verify_email_expire: moment
                                .utc()
                                .add(3, 'days')
                                .toISOString(),
                        });
                        const user = yield index_database_1.db.getRepository(user_1.User).save(newUser);
                        if (!user)
                            return server_error_1.default.notInsertToDatabase(res);
                        // Create profile
                        const CreateProfile = yield profile_controller_1.default.create(req, res);
                        if (!CreateProfile)
                            return server_error_1.default.notInsertToDatabase(res);
                        if (CreateProfile) {
                            const full_name = oldUser.nom + ' ' + oldUser.prenoms;
                            let slugExist;
                            let slug;
                            do {
                                // Defined the letter associated
                                const letter = 'd j o u m a f'.split(' ');
                                const letterRamdom = Math.floor(Math.random() * letter.length);
                                // Defined the slug of profile
                                slug = `${(0, slugify_1.default)(full_name, '_')}_${Math.floor(Math.random() * 10000)}${letter[letterRamdom]}`.toLowerCase();
                                // Get profile
                                slugExist = yield index_database_1.db
                                    .getRepository(userProfile_1.Profile)
                                    .findOne({ where: { slug } });
                                if (slugExist)
                                    return input_error_1.default.withoutInput(res, {
                                        message: 'slug est dèja utiliser !',
                                        path: 'all',
                                    });
                            } while (slugExist);
                            // Add image to profile
                            yield media_controller_1.default.create(req, res, CreateProfile['id']);
                            // Add preference of profile
                            let preferenceID = [65, 40, 41];
                            for (let i = 0; i < preferenceID.length; i++) {
                                const el = preferenceID[i];
                                const parameter = yield jParametre.findOne({
                                    where: { id: el },
                                    relations: { type_parameter: true },
                                });
                                const newPreference = jPreference.create({
                                    parameter: el,
                                    user: user,
                                    parent: parameter.type_parameter,
                                });
                                const savePreference = yield jPreference.save(newPreference);
                                if (!savePreference)
                                    return server_error_1.default.notInsertToDatabase(res);
                                if (savePreference.parameter === type_user) {
                                    type_user = savePreference;
                                }
                            }
                            let updateProfile = index_database_1.db.getRepository(userProfile_1.Profile).update({ id: CreateProfile['id'] }, {
                                id: CreateProfile['id'],
                                first_name: oldUser.nom,
                                last_name: oldUser.prenoms,
                                type: type_user,
                                full_name,
                                description,
                                slug,
                                bio: 'test',
                                lvl: 1,
                            });
                        }
                        // Associate the profile to user
                        const AssocciateProfileToUser = index_database_1.db
                            .getRepository(user_1.User)
                            .update({ id: newUser.id }, { profile: CreateProfile['id'] });
                        if (!AssocciateProfileToUser)
                            return server_error_1.default.notInsertToDatabase(res);
                        // Send email of verification
                        yield auth_mailer_1.default.sendMailToOldUser(email, password);
                    }
                }
                ;
                res.send('Send');
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
}
exports.SendEmailToOldUser = SendEmailToOldUser;
