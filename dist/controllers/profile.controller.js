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
const userProfile_1 = require("../models/userProfile");
const server_error_1 = require("../utils/err/server.error");
const user_1 = require("../models/user");
const input_error_1 = require("../utils/err/input.error");
const mediaUserProfile_1 = require("../models/mediaUserProfile");
const userPreference_1 = require("../models/userPreference");
const slugify_1 = require("slugify");
const parameter_1 = require("../models/parameter");
const media_controller_1 = require("./media.controller");
const typeorm_1 = require("typeorm");
class ProfileController {
    constructor() { }
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const JProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                let getAllProfile = [];
                const relations = ['user', 'media_profile', 'media_profile_cover'];
                //    Limit
                console.log(query.limit);
                if (query.limit && query.limit >= 0) {
                    const limit = parseInt(query.limit);
                    getAllProfile = yield JProfile.find({ take: query.limit });
                    return res.send({ parameter: getAllProfile, relations });
                }
                getAllProfile = yield JProfile.find({ where: {
                        slug: (0, typeorm_1.Not)((0, typeorm_1.IsNull)())
                    }, relations });
                return res.send({ profiles: getAllProfile });
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                // Get the informations entry request
                const { id } = req.body;
                // Get job data based on id
                const getProfile = yield jProfile.findOne({
                    where: { id: id.id },
                });
                if (!getProfile)
                    return server_error_1.default.noDataMatches(res);
                // Return Data
                return res.status(201).send({ profile: getProfile });
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    showWihSlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                // Get the informations entry request
                const { slug } = req.body;
                // Get job data based on id
                const getProfile = yield jProfile.findOne({
                    where: { slug: slug },
                    relations: {
                        user: true,
                        media_profile: true,
                        media_profile_cover: true,
                    },
                });
                if (!getProfile)
                    return server_error_1.default.noDataMatches(res);
                console.log(getProfile);
                // Return Data
                return res.status(201).send({ profile: getProfile });
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                // Initialize the user profile
                const jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                const newProfile = jProfile.create({
                    first_name: '',
                    last_name: '',
                    full_name: '',
                    bio: '',
                    lvl: 0,
                });
                const saveProfile = yield jProfile.save(newProfile);
                if (!saveProfile)
                    return server_error_1.default.notInsertToDatabase(res);
                return saveProfile;
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    update(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                let { id, userID, first_name, last_name, type_user, bio, description, preferenceID, } = req.body;
                // Initialize the user profile
                const jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                const jMedia = index_database_1.db.getRepository(mediaUserProfile_1.Media);
                const jPreference = index_database_1.db.getRepository(userPreference_1.Preference);
                const jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                const full_name = last_name + ' ' + first_name;
                let slugExist;
                let slug;
                do {
                    // Defined the letter associated
                    const letter = 'd j o u m a f'.split(' ');
                    const letterRamdom = Math.floor(Math.random() * letter.length);
                    // Defined the slug of profile
                    slug = `${(0, slugify_1.default)(full_name, '_')}_${Math.floor(Math.random() * 10000)}${letter[letterRamdom]}`.toLowerCase();
                    // Get profile
                    slugExist = yield index_database_1.db
                        .getRepository(userProfile_1.Profile)
                        .findOne({ where: { slug } });
                    if (slugExist)
                        return input_error_1.default.withoutInput(res, {
                            message: 'slug est dèja utiliser !',
                            path: 'all',
                        });
                } while (slugExist);
                // Add image to profile
                yield media_controller_1.default.create(req, res, id);
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
                for (let i = 0; i < preferenceID.length; i++) {
                    const el = preferenceID[i];
                    const parameter = yield jParametre.findOne({
                        where: { id: el },
                        relations: { type_parameter: true },
                    });
                    const newPreference = jPreference.create({
                        parameter: el,
                        user: userID,
                        parent: parameter.type_parameter,
                    });
                    const savePreference = yield jPreference.save(newPreference);
                    if (!savePreference)
                        return server_error_1.default.notInsertToDatabase(res);
                    if (savePreference.parameter === type_user) {
                        type_user = savePreference;
                    }
                }
                let updateProfile = jProfile.update({ id: id }, {
                    id,
                    first_name,
                    last_name,
                    type_user,
                    full_name,
                    description,
                    slug,
                    bio,
                    lvl: 1,
                });
                if (!updateProfile)
                    return server_error_1.default.notInsertToDatabase(res);
                const xUser = yield index_database_1.db
                    .getRepository(user_1.User)
                    .findOne({ where: { id }, relations: { profile: true } });
                if (!xUser)
                    return server_error_1.default.noDataMatches(res);
                return res.send({ user: xUser });
            }
            catch (error) {
                console.log(error);
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new ProfileController();
