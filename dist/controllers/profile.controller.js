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
const mediaUserProfile_1 = require("../models/mediaUserProfile");
const userPreference_1 = require("../models/userPreference");
const parameter_1 = require("../models/parameter");
const media_controller_1 = require("./media.controller");
const typeorm_1 = require("typeorm");
const slug_1 = require("../utils/adv/slug");
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
                const limit = query.limit ? parseInt(query.limit) : null;
                const type = query.type ? parseInt(query.type) : null;
                const types = query.type ? parseInt(query.type) : null;
                if (limit && type) {
                    getAllProfile = yield JProfile.find({
                        take: limit,
                        where: { typeuser: type, slug: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
                        relations,
                    });
                }
                else if (limit && !type) {
                    getAllProfile = yield JProfile.find({
                        take: limit,
                        where: { slug: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
                        relations,
                    });
                }
                else if (!limit && type) {
                    getAllProfile = yield JProfile.find({
                        take: limit,
                        where: { slug: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
                        relations,
                    });
                }
                else {
                    getAllProfile = yield JProfile.find({
                        where: { slug: (0, typeorm_1.Not)((0, typeorm_1.IsNull)()) },
                        relations,
                    });
                }
                return res.send({ profiles: getAllProfile });
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    particulier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const JProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                const jParameter = index_database_1.db.getRepository(parameter_1.Parameter);
                const relations = [
                    'user',
                    'type',
                    'media_profile',
                    'media_profile_cover',
                ];
                const xParameter = yield jParameter.findOne({
                    where: { title: 'Particulier' },
                    relations: ['profile'],
                });
                if (!xParameter)
                    return res.send({ profiles: [] });
                const gatA = xParameter.profile.filter((el) => {
                    return el.slug !== null;
                });
                return res.send({ profiles: xParameter });
            }
            catch (error) {
                console.log(error);
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
                    relations: ['user', 'media_profile', 'media_profile_cover', 'job', 'job.to_apply'],
                });
                getProfile.job.forEach((el) => {
                    el.to_apply = el.to_apply.length;
                });
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
                const { jSlug } = yield (0, slug_1.slugGetter)(res, full_name, userProfile_1.Profile);
                slug = jSlug;
                // Add image to profile
                media_controller_1.default.create(req, res, id);
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
                    type: type_user,
                    typeuser: type_user,
                    full_name,
                    description,
                    slug,
                    bio,
                    lvl: 1,
                });
                if (!updateProfile)
                    return server_error_1.default.notInsertToDatabase(res);
                const getProfile = yield index_database_1.db
                    .getRepository(userProfile_1.Profile)
                    .findOne({ where: { id } });
                const xUser = yield index_database_1.db
                    .getRepository(user_1.User)
                    .findOne({ where: { profile: getProfile === null || getProfile === void 0 ? void 0 : getProfile.id } });
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
    updateOfProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                let { id, first_name, last_name, bio, sex, born, contact, adresse, site_web, description, } = req.body;
                // Initialize the user profile
                const jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                const jMedia = index_database_1.db.getRepository(mediaUserProfile_1.Media);
                const jPreference = index_database_1.db.getRepository(userPreference_1.Preference);
                const jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                const full_name = last_name + ' ' + first_name;
                const { jSlug } = yield (0, slug_1.slugGetter)(res, full_name, userProfile_1.Profile);
                let updateProfile = jProfile.update({ id: id }, {
                    first_name,
                    last_name,
                    full_name,
                    description,
                    adresse,
                    site_web,
                    sex,
                    born,
                    bio,
                });
                if (!updateProfile)
                    return server_error_1.default.notInsertToDatabase(res);
                const xUser = yield index_database_1.db
                    .getRepository(userProfile_1.Profile)
                    .findOne({ where: { id }, relations: ['user', 'media_profile', 'media_profile_cover'] });
                if (!xUser)
                    return server_error_1.default.noDataMatches(res);
                return res.send({ profile: xUser });
            }
            catch (error) {
                console.log(error);
                server_error_1.default.catchError(res, error);
            }
        });
    }
    updateDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                let { id, description, } = req.body;
                // Initialize the user profile
                const jProfile = index_database_1.db.getRepository(userProfile_1.Profile);
                const jMedia = index_database_1.db.getRepository(mediaUserProfile_1.Media);
                const jPreference = index_database_1.db.getRepository(userPreference_1.Preference);
                const jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                let updateProfileDescription = jProfile.update({ id: id }, {
                    description
                });
                if (!updateProfileDescription)
                    return server_error_1.default.notInsertToDatabase(res);
                const xUser = yield index_database_1.db
                    .getRepository(userProfile_1.Profile)
                    .findOne({ where: { id }, relations: ['user', 'media_profile', 'media_profile_cover'] });
                if (!xUser)
                    return server_error_1.default.noDataMatches(res);
                return res.send({ description: xUser.description });
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
