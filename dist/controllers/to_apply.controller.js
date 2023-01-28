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
var jobToApply_1 = require("../models/jobToApply");
var user_services_1 = require("../services/user.services");
var talk_mail_controller_1 = require("./talk_mail.controller");
var user_1 = require("../models/user");
var ToApplyController = /** @class */ (function () {
    function ToApplyController() {
    }
    //
    ToApplyController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    //
    ToApplyController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jToApply, _a, jobID, userID, getToApply, _b, getCount, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        jToApply = index_database_1.db.getRepository(jobToApply_1.ToApplyJob);
                        _a = req.body, jobID = _a.jobID, userID = _a.userID;
                        if (!userID) return [3 /*break*/, 2];
                        return [4 /*yield*/, jToApply.findOne({
                                where: { user_id: userID, job_id: jobID },
                            })];
                    case 1:
                        _b = _c.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, jToApply.findOne({
                            where: { user_id: userID, job_id: jobID },
                        })];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        getToApply = _b;
                        return [4 /*yield*/, jToApply.countBy({ job_id: jobID })];
                    case 5:
                        getCount = _c.sent();
                        if (!getToApply)
                            return [2 /*return*/, res.send({ to_apply_job: null, count: getCount })];
                        // Return
                        return [2 /*return*/, res.send({ to_apply_job: getToApply, count: getCount })];
                    case 6:
                        error_1 = _c.sent();
                        server_error_1.default.catchError(res, error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //
    ToApplyController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jobID, newToApply, updateToApply, jToApply, jUser, Auth, ifAllwaysApply, _a, _b, saveToApply, userOwnerOfPost, saveTalkMail, error_2;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 9, , 10]);
                        jobID = req.body.jobID;
                        newToApply = void 0;
                        updateToApply = void 0;
                        jToApply = index_database_1.db.getRepository(jobToApply_1.ToApplyJob);
                        jUser = index_database_1.db.getRepository(user_1.User);
                        return [4 /*yield*/, user_services_1.default.current(req, res)];
                    case 1:
                        Auth = (_d.sent()).Auth;
                        return [4 /*yield*/, jToApply.findOne({
                                where: [{ user_id: Auth.user.id, job_id: jobID }],
                            })];
                    case 2:
                        ifAllwaysApply = _d.sent();
                        if (!ifAllwaysApply) return [3 /*break*/, 5];
                        return [4 /*yield*/, jToApply.update({ id: ifAllwaysApply.id }, {
                                limit: ifAllwaysApply.limit + 1,
                                is_apply: ifAllwaysApply.is_apply ? false : true,
                            })];
                    case 3:
                        updateToApply = _d.sent();
                        if (!updateToApply.affected) return [3 /*break*/, 5];
                        _b = (_a = res).send;
                        _c = {};
                        return [4 /*yield*/, jToApply.findOne({
                                where: { user: Auth.user.id, job: jobID },
                            })];
                    case 4: return [2 /*return*/, _b.apply(_a, [(_c.to_apply_job = _d.sent(),
                                _c)])];
                    case 5:
                        //  Create an new apply by current user on post
                        newToApply = jToApply.create({
                            job: jobID,
                            job_id: jobID,
                            user: Auth.user,
                            user_id: Auth.user.id,
                            is_apply: true,
                            limit: 1,
                        });
                        return [4 /*yield*/, jToApply.save(newToApply)];
                    case 6:
                        saveToApply = _d.sent();
                        //  If not insert on database
                        if (!saveToApply)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res, { message: '' })];
                        return [4 /*yield*/, jUser.findOne({
                                where: { job: jobID },
                                relations: ['profile'],
                            })];
                    case 7:
                        userOwnerOfPost = _d.sent();
                        if (!userOwnerOfPost)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        return [4 /*yield*/, talk_mail_controller_1.default.create(req, res, {
                                receiver: userOwnerOfPost,
                                subject: "Vous avez recu une nouvelle condidacture.",
                                message: "\n               <h1>Hello ".concat(userOwnerOfPost.profile.first_name, "</h1>\n               <a href=\"#\">Voir son profile</a>\n            "),
                            })];
                    case 8:
                        saveTalkMail = (_d.sent()).saveTalkMail;
                        if (!saveTalkMail)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                        // Send
                        return [2 /*return*/, res.send({ to_apply_job: saveToApply })];
                    case 9:
                        error_2 = _d.sent();
                        console.log(error_2);
                        server_error_1.default.catchError(res, error_2);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    //
    ToApplyController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    //
    ToApplyController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return ToApplyController;
}());
exports.default = new ToApplyController();
