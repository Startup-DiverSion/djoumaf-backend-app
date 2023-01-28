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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ejs = require("ejs");
var path = require("path");
var mailer_config_1 = require("../config/mailer.config");
var AuthMailer = /** @class */ (function () {
    function AuthMailer() {
    }
    AuthMailer.prototype.sendMailToVerifyAccount = function (receivers, usernane, token) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                try {
                    data = {
                        firstName: usernane,
                        confirm_link: process.env.HOST_CLIENT + "/auth/sign-validate-account?token=".concat(token),
                    };
                    console.log(process.env.HOST_CLIENT);
                    ejs.renderFile(path.join(__dirname, '../templates/auth/account.view.ejs'), data).then(function (result) {
                        (0, mailer_config_1.mailConfiguration)(receivers, '[DJOUMAF] Comfirmez votre adresse email', result);
                    });
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    AuthMailer.prototype.sendMailToOldUser = function (receivers, password) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                try {
                    data = {
                        confirm_link: 'https://unlayer.com/',
                        password: password,
                        email: receivers,
                    };
                    ejs.renderFile(path.join(__dirname, '../templates/auth/send_email_old_user.ejs'), data).then(function (result) {
                        (0, mailer_config_1.mailConfiguration)(receivers, '[DJOUMAF] Comfirmez votre adresse email', result);
                    });
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    AuthMailer.prototype.sendMailTochangePassword = function (receivers, fullName, code) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                try {
                    data = {
                        fullName: fullName,
                        email: receivers,
                        code: code,
                        rest_password: 'https://unlayer.com/',
                    };
                    ejs.renderFile(path.join(__dirname, '../templates/auth/password_sm.view.ejs'), data).then(function (result) {
                        (0, mailer_config_1.mailConfiguration)(receivers, '[DJOUMAF] Réinitialiser votre mot de passe', result);
                    });
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    AuthMailer.prototype.sendMailToSuccessChangePassword = function (receivers) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                try {
                    data = {
                        email: receivers,
                    };
                    ejs.renderFile(path.join(__dirname, '../templates/auth/success.view.ejs'), data).then(function (result) {
                        (0, mailer_config_1.mailConfiguration)(receivers, '[DJOUMAF] Mot de passe Réinitialiser avec succès.', result);
                    });
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    return AuthMailer;
}());
exports.default = new AuthMailer();
