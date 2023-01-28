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
require("dotenv/config");
var user_1 = require("../models/user");
var input_error_1 = require("../utils/err/input.error");
var auth_validator_1 = require("../utils/validators/auth.validator");
var index_database_1 = require("../database/index.database");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var auth_mailer_1 = require("../mail/auth.mailer");
var moment = require("moment");
var server_error_1 = require("../utils/err/server.error");
var profile_controller_1 = require("./profile.controller");
var userRole_1 = require("../models/userRole");
var client_error_1 = require("../utils/err/client.error");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    /**************************************************
       
          REGISTER A NEW USER
  
       *************************************************/
    AuthController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, signin_place, device, error, usernameExist, username, emailExist, salt, hashPassword, __RToken__, role, newUser, user, CreateProfile, AssocciateProfileToUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 13]);
                        _a = req.body, email = _a.email, password = _a.password, signin_place = _a.signin_place, device = _a.device;
                        error = auth_validator_1.default.register(req.body).error;
                        if (error) {
                            return [2 /*return*/, input_error_1.default.input(res, error)];
                        }
                        usernameExist = void 0;
                        username = void 0;
                        _b.label = 1;
                    case 1:
                        username = 'djouma-by-africa-' + Math.floor(Math.random() * 10000);
                        return [4 /*yield*/, index_database_1.db
                                .getRepository(user_1.User)
                                .findOne({ where: { username: username } })];
                    case 2:
                        usernameExist = _b.sent();
                        if (usernameExist)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: 'Username est dèja utiliser !',
                                    path: 'email',
                                })];
                        _b.label = 3;
                    case 3:
                        if (usernameExist) return [3 /*break*/, 1];
                        _b.label = 4;
                    case 4: return [4 /*yield*/, index_database_1.db
                            .getRepository(user_1.User)
                            .findOne({ where: { email: email } })];
                    case 5:
                        emailExist = _b.sent();
                        if (emailExist)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: "L'adresse email à déjà été pris",
                                    path: 'email',
                                })];
                        return [4 /*yield*/, bcrypt.genSalt(10)];
                    case 6:
                        salt = _b.sent();
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 7:
                        hashPassword = _b.sent();
                        __RToken__ = jwt.sign({ _id: email }, process.env.SECRET_TOKEN);
                        return [4 /*yield*/, index_database_1.db
                                .getRepository(userRole_1.Role)
                                .findOne({ where: { slug: 'dj_user' } })];
                    case 8:
                        role = _b.sent();
                        if (!role)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res, {
                                    message: 'No existe in database',
                                })];
                        // CREATING THE NEW USER
                        'sd'.toLowerCase();
                        newUser = index_database_1.db.getRepository(user_1.User).create({
                            username: username,
                            email: email.toLowerCase().trim(),
                            password: hashPassword,
                            token: __RToken__,
                            role: role,
                            signup_place: signin_place,
                            signin_place: signin_place,
                            device: device,
                            verify_email_expire: moment.utc().add(3, 'days').toISOString()
                        });
                        return [4 /*yield*/, index_database_1.db.getRepository(user_1.User).save(newUser)];
                    case 9:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                        return [4 /*yield*/, profile_controller_1.default.create(req, res)];
                    case 10:
                        CreateProfile = _b.sent();
                        if (!CreateProfile)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                        AssocciateProfileToUser = index_database_1.db
                            .getRepository(user_1.User)
                            .update({ id: newUser.id }, { profile: CreateProfile['id'] });
                        if (!AssocciateProfileToUser)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                        // Send email of verification
                        return [4 /*yield*/, auth_mailer_1.default.sendMailToVerifyAccount(email, username, __RToken__)];
                    case 11:
                        // Send email of verification
                        _b.sent();
                        // Return
                        return [2 /*return*/, res.status(201).json({ user: user, profile: CreateProfile })];
                    case 12:
                        error_1 = _b.sent();
                        return [2 /*return*/, server_error_1.default.catchError(res, error_1)];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**************************************************
      
        ALLOW TO A USER
 
      *************************************************/
    AuthController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, error, user, isvalidPass, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        error = auth_validator_1.default.login(req.body).error;
                        if (error) {
                            return [2 /*return*/, input_error_1.default.input(res, error)];
                        }
                        return [4 /*yield*/, index_database_1.db
                                .getRepository(user_1.User)
                                .findOne({
                                where: { email: email.toLowerCase().trim() },
                                relations: { profile: true, preference: true },
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: 'Email ou mot de password incorret',
                                    path: 'email',
                                })];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isvalidPass = _b.sent();
                        if (!isvalidPass)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: 'Email ou mot de password incorret',
                                    path: 'email',
                                })];
                        res.send({ user: user });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2 /*return*/, res.status(500).send(error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**************************************************
      
         VERIFY EMAIL AND SEND TO CHANGED PASSWORD
         SEND EMAIL WITH GENERATE CODE
 
      *************************************************/
    AuthController.prototype.forgetPassword_verifyMail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, code, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        email = req.body.email;
                        return [4 /*yield*/, index_database_1.db
                                .getRepository(user_1.User)
                                .findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        if (!user)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: "Ce email n'exist pas.",
                                    path: 'email',
                                })];
                        code = void 0;
                        do {
                            code = Math.floor(Math.random() * 99999);
                            console.log(code === user.rest_password_code);
                        } while (user.rest_password_code === code);
                        if (!(user.rest_password_code !== code)) return [3 /*break*/, 4];
                        return [4 /*yield*/, index_database_1.db.getRepository(user_1.User).update({ email: email }, {
                                rest_password_code: {
                                    code: code,
                                    expiry_date: moment().utc().add(30, 'minutes'),
                                },
                            })];
                    case 2:
                        result = _a.sent();
                        if (!result) return [3 /*break*/, 4];
                        return [4 /*yield*/, auth_mailer_1.default.sendMailTochangePassword(email, user.username, code)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        res.status(201).send({ message: 'Email envoyer avec succès !' });
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**************************************************
      
       VERIFY THE CODE TO PROVIDE FOR CHANGE PASSWORD
 
      *************************************************/
    AuthController.prototype.forgetPassword_verifyCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var xUser, _a, code, email, codeToExist, isExpiredCode, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        xUser = index_database_1.db.getRepository(user_1.User);
                        _a = req.body, code = _a.code, email = _a.email;
                        return [4 /*yield*/, xUser.findOne({ where: { email: email } })];
                    case 1:
                        codeToExist = _b.sent();
                        if ((!codeToExist.rest_password_code &&
                            codeToExist.rest_password_code['code'] !== code) ||
                            codeToExist.rest_password_code['code'] !== code)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: "Ce code n'est plus disponible.",
                                    path: 'code',
                                })];
                        isExpiredCode = moment(codeToExist.rest_password_code['expiry_date']).diff(new Date());
                        if (codeToExist.rest_password_code['code'] === code &&
                            isExpiredCode < 0) {
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: 'Ce code à expirer.',
                                    path: 'code',
                                })];
                        }
                        return [2 /*return*/, res
                                .status(201)
                                .send({ message: 'Votre code a été vérifier avec succès.' })];
                    case 2:
                        error_4 = _b.sent();
                        return [2 /*return*/, server_error_1.default.catchError(res, error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**************************************************
      
         CHANGE PASSWORD
 
      *************************************************/
    AuthController.prototype.forgetPassword_change = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var xUser, _a, email, code, old_password, new_password, qUser, codeToExist, isExpiredCode, salt, hashPassword, qNewPassword, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        xUser = index_database_1.db.getRepository(user_1.User);
                        _a = req.body, email = _a.email, code = _a.code, old_password = _a.old_password, new_password = _a.new_password;
                        code = parseInt(code);
                        qUser = xUser.findOne({
                            where: { email: email },
                        });
                        if (!qUser)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    path: 'old_password',
                                    message: 'Email invalide.',
                                })];
                        return [4 /*yield*/, xUser.findOne({ where: { email: email } })];
                    case 1:
                        codeToExist = _b.sent();
                        if ((!codeToExist.rest_password_code &&
                            codeToExist.rest_password_code['code'] !== code) ||
                            codeToExist.rest_password_code['code'] !== code)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: "Ce code n'est plus disponible.",
                                    path: 'code',
                                })];
                        isExpiredCode = moment(codeToExist.rest_password_code['expiry_date']).diff(new Date());
                        if (codeToExist.rest_password_code['code'] === code &&
                            isExpiredCode < 0) {
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: 'Ce code à expirer.',
                                    path: 'code',
                                })];
                        }
                        return [4 /*yield*/, bcrypt.genSalt(10)];
                    case 2:
                        salt = _b.sent();
                        return [4 /*yield*/, bcrypt.hash(new_password, salt)];
                    case 3:
                        hashPassword = _b.sent();
                        return [4 /*yield*/, xUser.update({ email: email }, {
                                password: hashPassword,
                            })];
                    case 4:
                        qNewPassword = _b.sent();
                        if (!qNewPassword)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res, {
                                    message: "Une error c'est produite.",
                                })];
                        if (!qNewPassword) return [3 /*break*/, 6];
                        return [4 /*yield*/, auth_mailer_1.default.sendMailToSuccessChangePassword(email)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6: return [2 /*return*/, res.status(201).send({
                            qNewPassword: qNewPassword,
                            message: 'Votre mot de passe à été supprimer avec success.',
                        })];
                    case 7:
                        error_5 = _b.sent();
                        return [2 /*return*/, server_error_1.default.catchError(res, error_5)];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.verify_is_owner = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var xUser, token, qUser, isExpiredCode, updateUser, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        xUser = index_database_1.db.getRepository(user_1.User);
                        token = req.body.token;
                        return [4 /*yield*/, xUser.findOne({
                                where: { token: token },
                            })];
                    case 1:
                        qUser = _a.sent();
                        if (!qUser)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    path: 'old_password',
                                    message: 'token invalide.',
                                })];
                        isExpiredCode = moment(qUser.verify_email_expire).diff(new Date());
                        if (isExpiredCode < 0) {
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: 'le link à expirer.',
                                    path: 'code',
                                })];
                        }
                        if (isExpiredCode > 0 && qUser.verify_email)
                            return [2 /*return*/, client_error_1.default.alreadyBeenExecuted(res)
                                // Update the field verify token
                            ];
                        updateUser = index_database_1.db.getRepository(user_1.User).update({ id: qUser.id }, {
                            verify_email: true
                        });
                        if (!updateUser)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res, { message: 'Cette information ne peut pas être mise à jour...' })];
                        return [2 /*return*/, res.status(201).send({
                                user: qUser,
                                message: 'Votre compte à été valider avec success',
                            })];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, server_error_1.default.catchError(res, error_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthController;
}());
exports.default = new AuthController();
