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
const user_1 = require("../models/user");
const parameter_1 = require("../models/parameter");
const cvExperience_1 = require("../models/cvExperience");
const user_services_1 = require("../services/user.services");
const cvSkill_1 = require("../models/cvSkill");
const slug_1 = require("./../utils/adv/slug");
const moment = require("moment");
class ProfileExperienceController {
    constructor() { }
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req.body;
                const jProfileExperience = index_database_1.db.getRepository(cvExperience_1.ExperienceCv);
                const jUser = index_database_1.db.getRepository(user_1.User);
                const relations = ['skill', 'skill.parameter', 'type_contract'];
                const getUser = yield jUser.findOne({
                    where: { id: user },
                    relations: [
                        'experience',
                        'experience.skill',
                        'experience.skill.parameter',
                        'experience.type_contract',
                    ],
                    select: ['experience'],
                });
                if (!getUser)
                    return server_error_1.default.noDataMatches(res);
                return res.send({ experiences: getUser.experience });
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
                const jProfileExperience = index_database_1.db.getRepository(cvExperience_1.ExperienceCv);
                // Get the informations entry request
                const { id } = req.body;
                // Get job data based on id
                const getProfile = yield jProfileExperience.findOne({
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
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                let { type_experience, company, date_start, date_finish, work_place, description, skills, currently_working, } = req.body;
                // Initialize the user profile
                const jProfileExperience = index_database_1.db.getRepository(cvExperience_1.ExperienceCv);
                const jSkill = index_database_1.db.getRepository(cvSkill_1.SkillCv);
                const jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                const { Auth } = yield user_services_1.default.current(req, res);
                const { jSlug } = yield (0, slug_1.slugGetter)(res, company, cvExperience_1.ExperienceCv);
                const newProfile = jProfileExperience.create({
                    slug: jSlug,
                    user: Auth.user.id,
                    company_name: company,
                    type_contract: type_experience,
                    date_start,
                    date_finish,
                    workplace: work_place,
                    currently_working,
                    description,
                    skill: skills,
                });
                const saveProfileExperience = yield jProfileExperience.save(newProfile);
                if (!saveProfileExperience)
                    return server_error_1.default.notInsertToDatabase(res);
                // Add competance of Experience
                let competance = skills;
                for (let i = 0; i < competance.length; i++) {
                    const el = competance[i];
                    const parameter = yield jParametre.findOne({
                        where: { id: el.id },
                        relations: { type_parameter: true },
                    });
                    const newSkill = jSkill.create({
                        parameter: el.id,
                        user: Auth.user,
                        parent: parameter.type_parameter,
                        experience: saveProfileExperience,
                    });
                    const savePreference = yield jSkill.save(newSkill);
                    if (!savePreference)
                        return server_error_1.default.notInsertToDatabase(res);
                }
                saveProfileExperience.date_start = moment(saveProfileExperience.date_start).format('MMMM Y');
                saveProfileExperience.date_finish =
                    !saveProfileExperience.currently_working
                        ? moment().format('MMMM Y')
                        : 'En cours';
                return res.status(201).send({ experience: saveProfileExperience });
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                let { id, type_experience, company, date_start, date_finish, work_place, description, skills, currently_working, } = req.body;
                // Initialize the user profile
                const jProfileExperience = index_database_1.db.getRepository(cvExperience_1.ExperienceCv);
                const jSkill = index_database_1.db.getRepository(cvSkill_1.SkillCv);
                const jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                const { Auth } = yield user_services_1.default.current(req, res);
                const updateProfile = yield jProfileExperience.update({ id }, {
                    id,
                    company_name: company,
                    type_contract: type_experience,
                    date_start,
                    date_finish,
                    workplace: work_place,
                    currently_working,
                    description,
                });
                const getProfileExperience = yield jProfileExperience.findOne({
                    where: { id },
                    relations: ['skill', 'skill.parameter', 'type_contract'],
                });
                if (!getProfileExperience)
                    return server_error_1.default.notInsertToDatabase(res);
                // Get all skill
                const getAllSkill = yield jSkill.find({
                    relations: { user: true, experience: true },
                });
                for (let i = 0; i < getAllSkill.length; i++) {
                    const el = getAllSkill[i];
                    if (el.user.id === Auth.user.id &&
                        el.experience.id === getProfileExperience.id) {
                        yield jSkill.delete({ id: el.id });
                    }
                }
                // Add competance of Experience
                let competance = skills;
                for (let i = 0; i < competance.length; i++) {
                    const el = competance[i];
                    const parameter = yield jParametre.findOne({
                        where: { id: el.id },
                        relations: { type_parameter: true },
                    });
                    const newSkill = jSkill.create({
                        parameter: el.id,
                        user: Auth.user,
                        parent: parameter.type_parameter,
                        experience: getProfileExperience,
                    });
                    const savePreference = yield jSkill.save(newSkill);
                    if (!savePreference)
                        return server_error_1.default.notInsertToDatabase(res);
                }
                const getOneProfileExperience = yield jProfileExperience.findOne({
                    where: { id },
                    relations: ['skill', 'skill.parameter', 'type_contract'],
                });
                getOneProfileExperience.date_start = moment(getOneProfileExperience.date_start).format('MMMM Y');
                getOneProfileExperience.date_finish =
                    !getOneProfileExperience.currently_working
                        ? moment().format('MMMM Y')
                        : 'En cours';
                return res.status(201).send({ experience: getOneProfileExperience });
            }
            catch (error) {
                console.log(error);
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jProfileExperience = index_database_1.db.getRepository(cvExperience_1.ExperienceCv);
                const { id } = req.body;
                // Verify is job exist in database
                const isExperience = yield jProfileExperience.findOne({ where: { id: id } });
                if (!isExperience)
                    return server_error_1.default.noDataMatches(res);
                // Remove
                yield jProfileExperience.softDelete({
                    id
                });
                return res
                    .status(201)
                    .send({ experience: { message: 'Experience supprimer avec succès!' } });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
}
exports.default = new ProfileExperienceController();
