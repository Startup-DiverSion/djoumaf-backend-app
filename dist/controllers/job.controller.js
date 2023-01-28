"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var jobs_1 = require("../models/jobs");
var job_validator_1 = require("../utils/validators/job.validator");
var input_error_1 = require("../utils/err/input.error");
var parameter_1 = require("../models/parameter");
var server_error_1 = require("../utils/err/server.error");
var user_services_1 = require("../services/user.services");
var moment = require("moment");
var slugify_1 = require("slugify");
var user_1 = require("../models/user");
var jobToApply_1 = require("../models/jobToApply");
var JobController = /** @class */ (function (_super) {
    __extends(JobController, _super);
    function JobController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //
    JobController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jJob, getAllJobs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        jJob = index_database_1.db.getRepository(jobs_1.Job);
                        return [4 /*yield*/, jJob.find({ relations: ["user", 'profile', 'profile.media_profile', 'profile.media_profile_cover', 'work_place', 'field_activity', 'contract_type'] })];
                    case 1:
                        getAllJobs = _a.sent();
                        res.status(201).send({ Jobs: getAllJobs });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Show Job
    JobController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jJob, slug, getJob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jJob = index_database_1.db.getRepository(jobs_1.Job);
                        slug = req.body.slug;
                        return [4 /*yield*/, jJob.findOne({
                                where: { slug: slug },
                                relations: ['user', 'user.profile', 'user.profile.media_profile', 'work_place', 'field_activity', 'contract_type'],
                            })];
                    case 1:
                        getJob = _a.sent();
                        if (!getJob)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        // Return Data
                        return [2 /*return*/, res.status(201).send({ job: getJob })];
                }
            });
        });
    };
    // Create Job
    JobController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jJob, jParameter_1, Auth, _a, title, description, field_activity, work_place, contract_type, localizaton_country, localizaton_city, dead_line, error, verifyForeignKeys, place, newJob, _b, _c, saveJob, error_2;
            var _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 4, , 5]);
                        jJob = index_database_1.db.getRepository(jobs_1.Job);
                        jParameter_1 = index_database_1.db.getRepository(parameter_1.Parameter);
                        return [4 /*yield*/, user_services_1.default.current(req, res)];
                    case 1:
                        Auth = (_e.sent()).Auth;
                        _a = req.body, title = _a.title, description = _a.description, field_activity = _a.field_activity, work_place = _a.work_place, contract_type = _a.contract_type, localizaton_country = _a.localizaton_country, localizaton_city = _a.localizaton_city, dead_line = _a.dead_line;
                        error = job_validator_1.default.post(req.body).error;
                        if (error) {
                            return [2 /*return*/, input_error_1.default.input(res, error)];
                        }
                        verifyForeignKeys = function (Keys) { return __awaiter(_this, void 0, void 0, function () {
                            var i, el, vForeignKeys;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < Keys.length)) return [3 /*break*/, 4];
                                        el = Keys[i];
                                        return [4 /*yield*/, jParameter_1.findOne({
                                                where: {
                                                    id: el,
                                                },
                                            })];
                                    case 2:
                                        vForeignKeys = _a.sent();
                                        if (!vForeignKeys)
                                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                                    path: el,
                                                    message: "".concat(el, " n'exist pas."),
                                                })];
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        // Checking the parameter table
                        verifyForeignKeys([field_activity, work_place, contract_type]);
                        place = {
                            country: localizaton_country,
                            city: localizaton_city,
                        };
                        _c = (_b = jJob).create;
                        _d = {
                            title: title,
                            slug: (0, slugify_1.default)(title, '_'),
                            description: description,
                            field_activity: field_activity,
                            work_place: work_place,
                            contract_type: contract_type,
                            localization: place,
                            dead_line: moment(dead_line).toDate(),
                            user: Auth.user
                        };
                        return [4 /*yield*/, index_database_1.db.getRepository(user_1.User).findOne({ where: { id: Auth.user.id }, relations: ['profile'] })];
                    case 2:
                        newJob = _c.apply(_b, [(_d.profile = (_e.sent()).profile,
                                _d)]);
                        return [4 /*yield*/, jJob.save(newJob)];
                    case 3:
                        saveJob = _e.sent();
                        if (!saveJob)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                        return [2 /*return*/, res.status(201).send({ job: saveJob })];
                    case 4:
                        error_2 = _e.sent();
                        console.log(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    //
    JobController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    //
    JobController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jJob, parmas, isJob, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        jJob = index_database_1.db.getRepository(jobs_1.Job);
                        parmas = req.params.id;
                        return [4 /*yield*/, jJob.findOne({ where: { id: parmas } })];
                    case 1:
                        isJob = _a.sent();
                        if (!isJob)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        // Remove job
                        return [4 /*yield*/, jJob.delete({
                                id: parmas,
                            })];
                    case 2:
                        // Remove job
                        _a.sent();
                        return [2 /*return*/, res
                                .status(201)
                                .send({ job: { message: 'Jobs supprimer avec succès!' } })];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return JobController;
}(jobToApply_1.ToApplyJob));
exports.default = new JobController();
