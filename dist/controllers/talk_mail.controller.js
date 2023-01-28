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
var index_database_1 = require("../database/index.database");
var server_error_1 = require("../utils/err/server.error");
var talkMail_1 = require("../models/talkMail");
var user_services_1 = require("../services/user.services");
var jwt = require("jsonwebtoken");
var user_1 = require("../models/user");
var chat_1 = require("../models/chat");
var TalkMailController = /** @class */ (function () {
    function TalkMailController() {
    }
    TalkMailController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jTalkMail, getAll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jTalkMail = index_database_1.db.getRepository(talkMail_1.TalkMail);
                        return [4 /*yield*/, jTalkMail.find({
                                relations: ['user', 'user.profile.media_profile', 'receiver'],
                            })];
                    case 1:
                        getAll = _a.sent();
                        if (!getAll)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        // Return Data
                        return [2 /*return*/, res.status(201).send({ talk_mails: getAll })];
                }
            });
        });
    };
    TalkMailController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = req.body.id;
                // Get the informations entry request
                // Get job data based on id
                // Return Data
                return [2 /*return*/, res.status(201).send()];
            });
        });
    };
    TalkMailController.prototype.create = function (req, res, reqBoy) {
        return __awaiter(this, void 0, void 0, function () {
            var jTalkMail, jUser, jChat, Auth, receiver, subject, message, xSignMail, signMail, chatID, checkIfChatExist, newChat, saveChat, userSendMail, userReceiverMail, newTalkMail, saveTalkMail;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jTalkMail = index_database_1.db.getRepository(talkMail_1.TalkMail);
                        jUser = index_database_1.db.getRepository(user_1.User);
                        jChat = index_database_1.db.getRepository(chat_1.Chat);
                        return [4 /*yield*/, user_services_1.default.current(req, res)];
                    case 1:
                        Auth = (_a.sent()).Auth;
                        receiver = reqBoy.receiver, subject = reqBoy.subject, message = reqBoy.message;
                        _a.label = 2;
                    case 2:
                        xSignMail = jwt.sign({ _id: Auth.user.id }, process.env.SECRET_SIGN_MAIL);
                        return [4 /*yield*/, jTalkMail.findOne({ where: { sign: xSignMail } })];
                    case 3:
                        signMail = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (signMail) return [3 /*break*/, 2];
                        _a.label = 5;
                    case 5: return [4 /*yield*/, jChat.findOne({
                            where: { name: Auth.user.username + '_InChat' + receiver.username },
                        })];
                    case 6:
                        checkIfChatExist = _a.sent();
                        if (!!checkIfChatExist) return [3 /*break*/, 12];
                        newChat = jChat.create({
                            name: Auth.user.username + '_InChat' + receiver.username,
                        });
                        return [4 /*yield*/, jChat.save(newChat)];
                    case 7:
                        saveChat = _a.sent();
                        return [4 /*yield*/, jUser.findOne({ where: { id: Auth.user.id } })];
                    case 8:
                        userSendMail = _a.sent();
                        userSendMail.chats = [saveChat];
                        return [4 /*yield*/, jUser.save(userSendMail)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, jUser.findOne({ where: { id: receiver.id } })];
                    case 10:
                        userReceiverMail = _a.sent();
                        userReceiverMail.chats = [saveChat];
                        return [4 /*yield*/, jUser.save(userReceiverMail)];
                    case 11:
                        _a.sent();
                        // 
                        chatID = saveChat.id;
                        return [3 /*break*/, 13];
                    case 12:
                        chatID = checkIfChatExist.id;
                        _a.label = 13;
                    case 13:
                        newTalkMail = jTalkMail.create({
                            from: Auth.user.email,
                            sign: xSignMail,
                            subject: subject,
                            message: message,
                            user: Auth.user.id,
                            chat: chatID
                        });
                        return [4 /*yield*/, jTalkMail.save(newTalkMail)];
                    case 14:
                        saveTalkMail = _a.sent();
                        return [2 /*return*/, { saveTalkMail: saveTalkMail }];
                }
            });
        });
    };
    TalkMailController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Init
                // Get the informations entry request
                // Get job data based on id
                // Return Data
                return [2 /*return*/, res.status(201).send()];
            });
        });
    };
    /** */
    TalkMailController.prototype.indexInTermsOfUserConnected = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jTalkMail, Auth, getAll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jTalkMail = index_database_1.db.getRepository(talkMail_1.TalkMail);
                        return [4 /*yield*/, user_services_1.default.current(req, res)];
                    case 1:
                        Auth = (_a.sent()).Auth;
                        return [4 /*yield*/, jTalkMail.find({
                                where: { user: Auth.user.id },
                                relations: ['user', 'user.profile.media_profile', 'user'],
                            })];
                    case 2:
                        getAll = _a.sent();
                        if (!getAll)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        // Return Data
                        return [2 /*return*/, res.status(201).send({ talk_mails: getAll })];
                }
            });
        });
    };
    /** */
    TalkMailController.prototype.allUserToSendEmail = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jUser, JChat, Auth, getAll;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jUser = index_database_1.db.getRepository(user_1.User);
                        JChat = index_database_1.db.getRepository(chat_1.Chat);
                        return [4 /*yield*/, user_services_1.default.current(req, res)];
                    case 1:
                        Auth = (_a.sent()).Auth;
                        return [4 /*yield*/, JChat.find({
                                relations: { users: true, message: true }
                            })];
                    case 2:
                        getAll = _a.sent();
                        getAll = getAll.filter(function (el) {
                            var _a;
                            return ((_a = el === null || el === void 0 ? void 0 : el.users[0]) === null || _a === void 0 ? void 0 : _a.id) === Auth.user.id;
                        });
                        if (!getAll)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        // Return Data
                        return [2 /*return*/, res.status(201).send({ talk_mails: getAll })];
                }
            });
        });
    };
    return TalkMailController;
}());
exports.default = new TalkMailController();
