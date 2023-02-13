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
const ejs = require("ejs");
const path = require("path");
const mailer_config_1 = require("../config/mailer.config");
const env_config_1 = require("../config/env.config");
class AuthMailer {
    constructor() { }
    sendMailToVerifyAccount(receivers, usernane, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    firstName: usernane,
                    confirm_link: env_config_1.env.HOST_CLIENT + `/auth/sign-validate-account?token=${token}`,
                };
                ejs.renderFile(path.join(__dirname, '../templates/auth/account.view.ejs'), data).then((result) => {
                    (0, mailer_config_1.mailConfiguration)(receivers, '[DJOUMAF] Comfirmez votre adresse email', result);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendMailToOldUser(receivers, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    confirm_link: 'https://unlayer.com/',
                    password,
                    email: receivers,
                };
                ejs.renderFile(path.join(__dirname, '../templates/auth/send_email_old_user.ejs'), data).then((result) => {
                    (0, mailer_config_1.mailConfiguration)(receivers, '[DJOUMAF] Ancien utilisateur', result);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendMailTochangePassword(receivers, fullName, code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    fullName: fullName,
                    email: receivers,
                    code: code,
                    rest_password: 'https://unlayer.com/',
                };
                ejs.renderFile(path.join(__dirname, '../templates/auth/password_sm.view.ejs'), data).then((result) => {
                    (0, mailer_config_1.mailConfiguration)(receivers, '[DJOUMAF] Réinitialiser votre mot de passe', result);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    sendMailToSuccessChangePassword(receivers) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = {
                    email: receivers,
                };
                ejs.renderFile(path.join(__dirname, '../templates/auth/success.view.ejs'), data).then((result) => {
                    (0, mailer_config_1.mailConfiguration)(receivers, '[DJOUMAF] Mot de passe Réinitialiser avec succès.', result);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new AuthMailer();
