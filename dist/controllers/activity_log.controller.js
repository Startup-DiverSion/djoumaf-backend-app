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
const parameterType_1 = require("../models/parameterType");
const userActivityLog_1 = require("../models/userActivityLog");
const user_services_1 = require("../services/user.services");
class ActivityLogController {
    constructor() { }
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                // Db
                const jActivityLog = index_database_1.db.getRepository(userActivityLog_1.ActivityLog);
                const { Auth } = yield user_services_1.default.current(req, res);
                let getAllActivityLog = yield jActivityLog.find({ relations: { log_status: true, user: true }, });
                getAllActivityLog = getAllActivityLog.filter((el) => {
                    return el.user.id === Auth.user.id;
                });
                console.log(getAllActivityLog);
                return res.status(201).send({ activity_log: getAllActivityLog });
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //
    create(req, res, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const { title, tag, source, source_id } = data;
                const id = 9;
                // Initialize the user profile
                const jActivityLog = index_database_1.db.getRepository(userActivityLog_1.ActivityLog);
                const jTypeParameter = index_database_1.db.getRepository(parameterType_1.TypeParameter);
                const { Auth } = yield user_services_1.default.current(req, res);
                // Get parameter
                const getParameter = yield jTypeParameter.findOne({
                    where: { id },
                    relations: { parameter: true },
                });
                //  Get Activity log parameter
                const activityLog = getParameter.parameter;
                let log_status = activityLog.find((el) => {
                    el.title === title;
                });
                if (!log_status)
                    log_status = null;
                //  Create
                const newActivityLog = jActivityLog.create({
                    source,
                    title,
                    tag,
                    source_id,
                    log_status,
                    user: Auth.user.id
                });
                const saveActivityLog = yield jActivityLog.save(newActivityLog);
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new ActivityLogController();
