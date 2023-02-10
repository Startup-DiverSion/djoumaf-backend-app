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
const jwt = require("jsonwebtoken");
const index_database_1 = require("../database/index.database");
const user_1 = require("../models/user");
const env_config_1 = require("../config/env.config");
class UserService {
    current(req = Request, res = Response) {
        return __awaiter(this, void 0, void 0, function* () {
            const getTokenWeb = req.headers.authorization;
            // VERIFY IF TOKEN EXISTS
            if (!getTokenWeb)
                return res.status(401).send({ message: 'Accés interdit' });
            const verified = jwt.verify(getTokenWeb, env_config_1.env.SECRET_TOKEN);
            req.header = verified;
            // GET ID IN TOKEN WEB
            const getTokenWebID = jwt.decode(getTokenWeb, {
                complete: true,
            }).payload['_id'];
            const getTokenUser = yield index_database_1.db.getRepository(user_1.User).findOne({
                where: { email: getTokenWebID },
            });
            return { getTokenWebID, getTokenUser, Auth: { user: getTokenUser } };
        });
    }
}
exports.default = new UserService();
