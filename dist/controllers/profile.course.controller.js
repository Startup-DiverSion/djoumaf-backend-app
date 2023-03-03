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
const user_services_1 = require("../services/user.services");
const cvSkill_1 = require("../models/cvSkill");
const slug_1 = require("./../utils/adv/slug");
const cvCourse_1 = require("../models/cvCourse");
const moment = require("moment");
class ProfileCourseController {
    constructor() { }
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 
                const { user } = req.body;
                // 
                const jProfileCourse = index_database_1.db.getRepository(cvCourse_1.CourseCV);
                const jUser = index_database_1.db.getRepository(user_1.User);
                const getUser = yield jUser.findOne({
                    where: { id: user }, relations: ['course', 'course.diploma'], select: ['course']
                });
                if (!getUser)
                    return server_error_1.default.noDataMatches(res);
                return res.send({ courses: getUser.course });
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
                const jProfileCourse = index_database_1.db.getRepository(cvCourse_1.CourseCV);
                // Get the informations entry request
                const { id } = req.body;
                // Get job data based on id
                const getProfile = yield jProfileCourse.findOne({
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
                let { etablishment, domain, date_start, date_finish, diploma, description, work_place, currently_working } = req.body;
                // Initialize the user profile
                const jProfileCourse = index_database_1.db.getRepository(cvCourse_1.CourseCV);
                const jSkill = index_database_1.db.getRepository(cvSkill_1.SkillCv);
                const jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                const { Auth } = yield user_services_1.default.current(req, res);
                const { jSlug } = yield (0, slug_1.slugGetter)(res, etablishment, cvCourse_1.CourseCV);
                const newProfileCourse = jProfileCourse.create({
                    slug: jSlug,
                    user: Auth.user.id,
                    etablishment,
                    diploma,
                    domain,
                    date_start,
                    date_finish,
                    workplace: work_place,
                    currently_working,
                    description,
                });
                const saveProfileCourse = yield jProfileCourse.save(newProfileCourse);
                if (!saveProfileCourse)
                    return server_error_1.default.notInsertToDatabase(res);
                const getCourse = yield jProfileCourse.findOne({ where: { id: saveProfileCourse.id }, relations: { diploma: true } });
                getCourse.date_start = moment(getCourse.date_start).utc().format(' Y');
                getCourse.date_finish =
                    !getCourse.currently_working
                        ? moment().utc().format(' Y')
                        : 'En cours';
                return res.status(201).send({ course: getCourse });
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
                let { id, etablishment, domain, date_start, date_finish, diploma, description, work_place, currently_working } = req.body;
                // Initialize the user profile
                const jProfileCourse = index_database_1.db.getRepository(cvCourse_1.CourseCV);
                const jSkill = index_database_1.db.getRepository(cvSkill_1.SkillCv);
                const jParametre = index_database_1.db.getRepository(parameter_1.Parameter);
                const { Auth } = yield user_services_1.default.current(req, res);
                const { jSlug } = yield (0, slug_1.slugGetter)(res, etablishment, cvCourse_1.CourseCV);
                const updateProfileCourse = jProfileCourse.update({ id }, {
                    slug: jSlug,
                    user: Auth.user.id,
                    etablishment,
                    diploma,
                    domain,
                    date_start,
                    date_finish,
                    workplace: work_place,
                    currently_working,
                    description,
                });
                if (!updateProfileCourse)
                    return server_error_1.default.notInsertToDatabase(res);
                const getCourse = yield jProfileCourse.findOne({ where: { id }, relations: { diploma: true } });
                getCourse.date_start = moment(getCourse.date_start).format(' Y');
                getCourse.date_finish =
                    !getCourse.currently_working
                        ? moment().format(' Y')
                        : 'En cours';
                return res.status(201).send({ course: getCourse });
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jProfileCourse = index_database_1.db.getRepository(cvCourse_1.CourseCV);
                const { id } = req.body;
                // Verify is job exist in database
                const isCourse = yield jProfileCourse.findOne({ where: { id: id } });
                if (!isCourse)
                    return server_error_1.default.noDataMatches(res);
                // Remove job
                yield jProfileCourse.softDelete({
                    id
                });
                return res
                    .status(201)
                    .send({ course: { message: 'Formation supprimer avec succès!' } });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
}
exports.default = new ProfileCourseController();
