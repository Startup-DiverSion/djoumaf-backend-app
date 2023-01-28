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
exports.SendEmailToOldUser = void 0;
var index_database_1 = require("../database/index.database");
var user_1 = require("../models/user");
var oldUserDb_1 = require("../oldUserDb");
require("dotenv/config");
var input_error_1 = require("../utils/err/input.error");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var auth_mailer_1 = require("../mail/auth.mailer");
var server_error_1 = require("../utils/err/server.error");
var profile_controller_1 = require("./../controllers/profile.controller");
var SendEmailToOldUser = /** @class */ (function () {
    function SendEmailToOldUser() {
    }
    SendEmailToOldUser.prototype.create_user = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    // GET FIELD TO SIGN UP USER
                    oldUserDb_1.dataSelected.data.forEach(function (oldUser) { return __awaiter(_this, void 0, void 0, function () {
                        var emailExist, usernameExist, username, salt, hashPassword, __RToken__, newUser, user, CreateProfile, AssocciateProfileToUser;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, index_database_1.db
                                        .getRepository(user_1.User)
                                        .findOne({ where: { email: oldUser.email } })];
                                case 1:
                                    emailExist = _a.sent();
                                    if (!!emailExist) return [3 /*break*/, 11];
                                    usernameExist = void 0;
                                    username = void 0;
                                    _a.label = 2;
                                case 2:
                                    username =
                                        'djouma-by-africa-' + Math.floor(Math.random() * 10000);
                                    return [4 /*yield*/, index_database_1.db
                                            .getRepository(user_1.User)
                                            .findOne({ where: { username: username } })];
                                case 3:
                                    usernameExist = _a.sent();
                                    if (usernameExist)
                                        return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                                message: 'Username est dèja utiliser !',
                                                path: 'email',
                                            })];
                                    _a.label = 4;
                                case 4:
                                    if (usernameExist) return [3 /*break*/, 2];
                                    _a.label = 5;
                                case 5: return [4 /*yield*/, bcrypt.genSalt(10)];
                                case 6:
                                    salt = _a.sent();
                                    return [4 /*yield*/, bcrypt.hash('s0//P4$$w0rD', salt)];
                                case 7:
                                    hashPassword = _a.sent();
                                    __RToken__ = jwt.sign({ _id: oldUser.email }, process.env.SECRET_TOKEN);
                                    newUser = index_database_1.db.getRepository(user_1.User).create({
                                        username: username,
                                        email: oldUser.email,
                                        password: hashPassword,
                                        token: __RToken__,
                                    });
                                    return [4 /*yield*/, index_database_1.db.getRepository(user_1.User).save(newUser)];
                                case 8:
                                    user = _a.sent();
                                    if (!user)
                                        return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                                    return [4 /*yield*/, profile_controller_1.default.create(req, res)];
                                case 9:
                                    CreateProfile = _a.sent();
                                    if (!CreateProfile)
                                        return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                                    AssocciateProfileToUser = index_database_1.db
                                        .getRepository(user_1.User)
                                        .update({ id: newUser.id }, { profile: CreateProfile['id'] });
                                    if (!AssocciateProfileToUser)
                                        return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                                    // SUCESS CREATE NEW USER
                                    return [4 /*yield*/, auth_mailer_1.default.sendMailToOldUser(oldUser.email, 's0//P4$$w0rD')];
                                case 10:
                                    // SUCESS CREATE NEW USER
                                    _a.sent();
                                    console.log('fait!');
                                    _a.label = 11;
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                catch (error) {
                    return [2 /*return*/, server_error_1.default.catchError(res, error)];
                }
                return [2 /*return*/];
            });
        });
    };
    return SendEmailToOldUser;
}());
exports.SendEmailToOldUser = SendEmailToOldUser;
