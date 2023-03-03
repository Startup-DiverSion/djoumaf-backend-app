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
const parameter_1 = require("../models/parameter");
class FieldActivityController {
    constructor() { }
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    number_activities_depending_job(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jParameter = index_database_1.db.getRepository(parameter_1.Parameter);
                let field_activity = [];
                field_activity = yield jParameter.find({
                    relations: { job: true, type_parameter: true },
                    select: ['job', 'type_parameter'],
                });
                field_activity = field_activity.filter((el) => {
                    return el.type_parameter.id === 1;
                });
                field_activity.forEach((el) => {
                    el.job = el.job.length;
                });
                field_activity.sort((a, b) => {
                    return b.job - a.job;
                });
                return res.send({ field_activity });
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
    create(req, res, profileID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                // Initialize the user profile
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
exports.default = new FieldActivityController();
