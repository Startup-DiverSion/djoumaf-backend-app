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
const index_database_1 = require("../database/index.database");
const server_error_1 = require("../utils/err/server.error");
const talkMail_1 = require("../models/talkMail");
const user_services_1 = require("../services/user.services");
const jwt = require("jsonwebtoken");
const user_1 = require("../models/user");
const chat_1 = require("../models/chat");
const env_config_1 = require("../config/env.config");
class TalkMailController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const jTalkMail = index_database_1.db.getRepository(talkMail_1.TalkMail);
            // Get the informations entry request
            // Get job data based on id
            const getAll = yield jTalkMail.find({
                relations: ['user', 'user.profile.media_profile', 'receiver'],
            });
            if (!getAll)
                return server_error_1.default.noDataMatches(res);
            // Return Data
            return res.status(201).send({ talk_mails: getAll });
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const { id } = req.body;
            // Get the informations entry request
            // Get job data based on id
            // Return Data
            return res.status(201).send();
        });
    }
    create(req, res, reqBoy) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const jTalkMail = index_database_1.db.getRepository(talkMail_1.TalkMail);
            const jUser = index_database_1.db.getRepository(user_1.User);
            const jChat = index_database_1.db.getRepository(chat_1.Chat);
            const { Auth } = yield user_services_1.default.current(req, res);
            // Get the informations entry request
            const { receiver, subject, message } = reqBoy;
            // VERIFY IF SIGN MAIL IS ALREADY EXISTS IN DATABASE
            let xSignMail;
            let signMail;
            do {
                xSignMail = jwt.sign({ _id: Auth.user.id }, env_config_1.env.SECRET_SIGN_MAIL);
                signMail = yield jTalkMail.findOne({ where: { sign: xSignMail } });
            } while (signMail);
            // Verify if chat exist in database
            let chatID;
            const checkIfChatExist = yield jChat.findOne({
                where: { name: Auth.user.username + '_InChat' + receiver.username },
            });
            // Check
            if (!checkIfChatExist) {
                // Create new chat
                const newChat = jChat.create({
                    name: Auth.user.username + '_InChat' + receiver.username,
                });
                const saveChat = yield jChat.save(newChat);
                // 
                const userSendMail = yield jUser.findOne({ where: { id: Auth.user.id } });
                userSendMail.chats = [saveChat];
                yield jUser.save(userSendMail);
                const userReceiverMail = yield jUser.findOne({ where: { id: receiver.id } });
                userReceiverMail.chats = [saveChat];
                yield jUser.save(userReceiverMail);
                // 
                chatID = saveChat.id;
            }
            else {
                chatID = checkIfChatExist.id;
            }
            // Create
            const newTalkMail = jTalkMail.create({
                from: Auth.user.email,
                sign: xSignMail,
                subject,
                message,
                user: Auth.user.id,
                chat: chatID
            });
            const saveTalkMail = yield jTalkMail.save(newTalkMail);
            return { saveTalkMail };
            // Return Data
            // return res.status(201).send();
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            // Get the informations entry request
            // Get job data based on id
            // Return Data
            return res.status(201).send();
        });
    }
    /** */
    indexInTermsOfUserConnected(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const jTalkMail = index_database_1.db.getRepository(talkMail_1.TalkMail);
            // Get the informations entry request
            const { Auth } = yield user_services_1.default.current(req, res);
            // Get job data based on id
            const getAll = yield jTalkMail.find({
                where: { user: Auth.user.id },
                relations: ['user', 'user.profile.media_profile', 'user'],
            });
            if (!getAll)
                return server_error_1.default.noDataMatches(res);
            // Return Data
            return res.status(201).send({ talk_mails: getAll });
        });
    }
    /** */
    allUserToSendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const jUser = index_database_1.db.getRepository(user_1.User);
            const JChat = index_database_1.db.getRepository(chat_1.Chat);
            // Get the informations entry request
            const { Auth } = yield user_services_1.default.current(req, res);
            // Get job data based on id
            let getAll = yield JChat.find({
                relations: { users: true, message: true }
            });
            getAll = getAll.filter((el) => {
                var _a;
                return ((_a = el === null || el === void 0 ? void 0 : el.users[0]) === null || _a === void 0 ? void 0 : _a.id) === Auth.user.id;
            });
            if (!getAll)
                return server_error_1.default.noDataMatches(res);
            // Return Data
            return res.status(201).send({ talk_mails: getAll });
        });
    }
}
exports.default = new TalkMailController();
