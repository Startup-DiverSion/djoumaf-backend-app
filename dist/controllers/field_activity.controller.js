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
const jobs_1 = require("../models/jobs");
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
                const getAllJobs = index_database_1.db.getRepository(jobs_1.Job);
                let field_activity = [];
                // Get
                // const JFieldActivity = await getAllJobs.find({relations: {field_activity : true}})
                // if(!JFieldActivity) return res.send({field_activity})
                // JFieldActivity.forEach(field => {
                //     for (let i = 0; i < field_activity.length; i++) {
                //         const el = field_activity[i];
                //         if(field.title !== el.name){
                //             field_activity.push({name: field.title, count: 0 })
                //         }else{
                //             el.count = el.count + 1
                //         }
                //     }
                // });
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
