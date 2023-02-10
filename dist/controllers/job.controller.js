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
const jobs_1 = require("../models/jobs");
const job_validator_1 = require("../utils/validators/job.validator");
const input_error_1 = require("../utils/err/input.error");
const parameter_1 = require("../models/parameter");
const server_error_1 = require("../utils/err/server.error");
const user_services_1 = require("../services/user.services");
const moment = require("moment");
const slugify_1 = require("slugify");
const user_1 = require("../models/user");
const jobToApply_1 = require("../models/jobToApply");
class JobController extends jobToApply_1.ToApplyJob {
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jJob = index_database_1.db.getRepository(jobs_1.Job);
                // Get all jobs
                const getAllJobs = yield jJob.find({ relations: ["user", 'profile', 'profile.media_profile', 'profile.media_profile_cover', 'work_place', 'field_activity', 'contract_type'] });
                if (!getAllJobs)
                    return server_error_1.default.noDataMatches(res);
                res.status(201).send({ Jobs: getAllJobs });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
    //Show Job
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const jJob = index_database_1.db.getRepository(jobs_1.Job);
            // Get the informations entry request
            const { slug } = req.body;
            // Get job data based on id
            const getJob = yield jJob.findOne({
                where: { slug },
                relations: ['user', 'user.profile', 'user.profile.media_profile', 'work_place', 'field_activity', 'contract_type'],
            });
            if (!getJob)
                return server_error_1.default.noDataMatches(res);
            // Return Data
            return res.status(201).send({ job: getJob });
        });
    }
    // Create Job
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jJob = index_database_1.db.getRepository(jobs_1.Job);
                const jParameter = index_database_1.db.getRepository(parameter_1.Parameter);
                const { Auth } = yield user_services_1.default.current(req, res);
                // Get the informations entry request
                const { title, description, field_activity, work_place, contract_type, localizaton_country, localizaton_city, dead_line, } = req.body;
                // Validate the informations
                const { error } = job_validator_1.default.post(req.body);
                if (error) {
                    return input_error_1.default.input(res, error);
                }
                let slugExist;
                let slug;
                do {
                    // Defined the letter associated
                    const letter = 'd j o u m a f'.split(' ');
                    const letterRamdom = Math.floor(Math.random() * letter.length);
                    // Defined the slug of profile
                    slug = `${(0, slugify_1.default)(title, '_')}_${Math.floor(Math.random() * 10000)}${letter[letterRamdom]}`.toLowerCase();
                    // Get profile
                    slugExist = yield index_database_1.db
                        .getRepository(jobs_1.Job)
                        .findOne({ where: { slug } });
                    if (slugExist)
                        return input_error_1.default.withoutInput(res, {
                            message: 'slug est dèja utiliser !',
                            path: 'all',
                        });
                } while (slugExist);
                //verification of foreign keys in paramater table
                const verifyForeignKeys = (Keys) => __awaiter(this, void 0, void 0, function* () {
                    for (let i = 0; i < Keys.length; i++) {
                        const el = Keys[i];
                        const vForeignKeys = yield jParameter.findOne({
                            where: {
                                id: el,
                            },
                        });
                        if (!vForeignKeys)
                            return input_error_1.default.withoutInput(res, {
                                path: el,
                                message: `${el} n'exist pas.`,
                            });
                    }
                });
                // Checking the parameter table
                verifyForeignKeys([field_activity, work_place, contract_type]);
                const place = {
                    country: localizaton_country,
                    city: localizaton_city,
                };
                // Create and add a new jobs
                const newJob = jJob.create({
                    title,
                    slug,
                    description,
                    field_activity,
                    work_place,
                    contract_type,
                    country: localizaton_country === null || localizaton_country === void 0 ? void 0 : localizaton_country.name,
                    city: localizaton_city === null || localizaton_city === void 0 ? void 0 : localizaton_city.name,
                    dead_line: moment(dead_line).toDate(),
                    user: Auth.user,
                    profile: (yield index_database_1.db.getRepository(user_1.User).findOne({ where: { id: Auth.user.id }, relations: ['profile'] })).profile
                });
                const saveJob = yield jJob.save(newJob);
                if (!saveJob)
                    return server_error_1.default.notInsertToDatabase(res);
                return res.status(201).send({ job: saveJob });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jJob = index_database_1.db.getRepository(jobs_1.Job);
                const parmas = req.params.id;
                // Verify is job exist in database
                const isJob = yield jJob.findOne({ where: { id: parmas } });
                if (!isJob)
                    return server_error_1.default.noDataMatches(res);
                // Remove job
                yield jJob.delete({
                    id: parmas,
                });
                return res
                    .status(201)
                    .send({ job: { message: 'Jobs supprimer avec succès!' } });
            }
            catch (error) {
                return server_error_1.default.catchError(res, error);
            }
        });
    }
}
exports.default = new JobController();
