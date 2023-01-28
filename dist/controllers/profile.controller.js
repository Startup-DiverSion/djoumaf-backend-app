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
var userProfile_1 = require("../models/userProfile");
var server_error_1 = require("../utils/err/server.error");
var input_error_1 = require("../utils/err/input.error");
var mediaUserProfile_1 = require("../models/mediaUserProfile");
var userPreference_1 = require("../models/userPreference");
var slugify_1 = require("slugify");
var parameter_1 = require("../models/parameter");
var media_controller_1 = require("./media.controller");
var ProfileController = /** @class */ (function () {
    function ProfileController() {
    }
    //
    ProfileController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    //
    ProfileController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jProfile, id, getProfile, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                        id = req.body.id;
                        return [4 /*yield*/, jProfile.findOne({
                                where: { id: id.id },
                            })];
                    case 1:
                        getProfile = _a.sent();
                        if (!getProfile)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        // Return Data
                        return [2 /*return*/, res.status(201).send({ profile: getProfile })];
                    case 2:
                        error_1 = _a.sent();
                        server_error_1.default.catchError(res, error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    ProfileController.prototype.showWihSlug = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jProfile, slug, getProfile, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                        slug = req.body.slug;
                        return [4 /*yield*/, jProfile.findOne({
                                where: { slug: slug },
                                relations: { user: true, media_profile: true, media_profile_cover: true },
                            })];
                    case 1:
                        getProfile = _a.sent();
                        if (!getProfile)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        console.log(getProfile);
                        // Return Data
                        return [2 /*return*/, res.status(201).send({ profile: getProfile })];
                    case 2:
                        error_2 = _a.sent();
                        server_error_1.default.catchError(res, error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    ProfileController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var jProfile, newProfile, saveProfile, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                        newProfile = jProfile.create({
                            first_name: '',
                            last_name: '',
                            full_name: '',
                            bio: '',
                            lvl: 0,
                        });
                        return [4 /*yield*/, jProfile.save(newProfile)];
                    case 1:
                        saveProfile = _a.sent();
                        if (!saveProfile)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                        return [2 /*return*/, saveProfile];
                    case 2:
                        error_3 = _a.sent();
                        server_error_1.default.catchError(res, error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //
    ProfileController.prototype.update = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, id, userID, first_name, last_name, type_user, bio, description, preferenceID, jProfile, jMedia, jPreference, jParametre, full_name, slugExist, slug, letter, letterRamdom, i, el, parameter, newPreference, savePreference, updateProfile, xProfile, error_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 12, , 13]);
                        _b = req.body, id = _b.id, userID = _b.userID, first_name = _b.first_name, last_name = _b.last_name, type_user = _b.type_user, bio = _b.bio, description = _b.description, preferenceID = _b.preferenceID;
                        jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                        jMedia = index_database_1.db.getRepository(mediaUserProfile_1.Media);
                        jPreference = index_database_1.db.getRepository(userPreference_1.Preference);
                        jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                        full_name = last_name + ' ' + first_name;
                        slugExist = void 0;
                        slug = void 0;
                        _c.label = 1;
                    case 1:
                        letter = 'd j o u m a f'.split(' ');
                        letterRamdom = Math.floor(Math.random() * letter.length);
                        // Defined the slug of profile
                        slug = "".concat((0, slugify_1.default)(full_name, '_'), "_").concat(Math.floor(Math.random() * 10000)).concat(letter[letterRamdom]).toLowerCase();
                        return [4 /*yield*/, index_database_1.db
                                .getRepository(userProfile_1.Profile)
                                .findOne({ where: { slug: slug } })];
                    case 2:
                        // Get profile
                        slugExist = _c.sent();
                        if (slugExist)
                            return [2 /*return*/, input_error_1.default.withoutInput(res, {
                                    message: 'slug est dèja utiliser !',
                                    path: 'all',
                                })];
                        _c.label = 3;
                    case 3:
                        if (slugExist) return [3 /*break*/, 1];
                        _c.label = 4;
                    case 4: 
                    // Add image to profile
                    return [4 /*yield*/, media_controller_1.default.create(req, res, id)];
                    case 5:
                        // Add image to profile
                        _c.sent();
                        // if (req.file) {
                        //    const newMedia = jMedia.create({
                        //       url: req.file,
                        //       profile: id,
                        //    });
                        //    const saveMedia = await jMedia.save(newMedia);
                        //    if (!saveMedia) return serverError.notInsertToDatabase(res);
                        // }
                        // Add preference of profile
                        preferenceID = (_a = JSON.parse(preferenceID)) === null || _a === void 0 ? void 0 : _a.pref;
                        i = 0;
                        _c.label = 6;
                    case 6:
                        if (!(i < preferenceID.length)) return [3 /*break*/, 10];
                        el = preferenceID[i];
                        return [4 /*yield*/, jParametre.findOne({ where: { id: el }, relations: { type_parameter: true } })];
                    case 7:
                        parameter = _c.sent();
                        newPreference = jPreference.create({
                            parameter: el,
                            user: userID,
                            parent: parameter.type_parameter
                        });
                        return [4 /*yield*/, jPreference.save(newPreference)];
                    case 8:
                        savePreference = _c.sent();
                        if (!savePreference)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                        if (savePreference.parameter === type_user) {
                            type_user = savePreference;
                        }
                        _c.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 6];
                    case 10:
                        updateProfile = jProfile.update({ id: id }, {
                            id: id,
                            first_name: first_name,
                            last_name: last_name,
                            type_user: type_user,
                            full_name: full_name,
                            description: description,
                            slug: slug,
                            bio: bio,
                            lvl: 1,
                        });
                        if (!updateProfile)
                            return [2 /*return*/, server_error_1.default.notInsertToDatabase(res)];
                        return [4 /*yield*/, index_database_1.db.getRepository(userProfile_1.Profile).findOne({ where: { id: id } })];
                    case 11:
                        xProfile = _c.sent();
                        if (!updateProfile)
                            return [2 /*return*/, server_error_1.default.noDataMatches(res)];
                        return [2 /*return*/, res.send({ profile: xProfile })];
                    case 12:
                        error_4 = _c.sent();
                        console.log(error_4);
                        server_error_1.default.catchError(res, error_4);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    //
    ProfileController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return ProfileController;
}());
exports.default = new ProfileController();
