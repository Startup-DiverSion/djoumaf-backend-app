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
const userProfile_1 = require("../models/userProfile");
class CercleController {
    myCercle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
            // Get the informations entry request
            const { slug } = req.body;
            // Get job data based on id
            const getMyCercle = yield jProfile.findOne({
                where: { slug },
                relations: ['user.profile', 'work_place', 'field_activity', 'contract_type'],
            });
            if (!getMyCercle)
                return server_error_1.default.noDataMatches(res);
            // Return Data
            return res.status(201).send({ job: getMyCercle });
        });
    }
    pr(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            // Get the informations entry request
            // Get job data based on id
            // Return Data
            return res.status(201).send();
        });
    }
}
exports.default = new CercleController();
