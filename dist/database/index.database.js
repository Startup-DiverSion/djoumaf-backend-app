"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDb = exports.db = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var user_1 = require("../models/user");
var jobs_1 = require("../models/jobs");
var mediaUserProfile_1 = require("../models/mediaUserProfile");
var userProfile_1 = require("../models/userProfile");
var parameterType_1 = require("../models/parameterType");
var parameter_1 = require("../models/parameter");
var userPreference_1 = require("../models/userPreference");
var cvModel_1 = require("../models/cvModel");
var cvUser_1 = require("../models/cvUser");
var mediaUserProfileCV_1 = require("../models/mediaUserProfileCV");
var userRole_1 = require("../models/userRole");
var jobToApply_1 = require("../models/jobToApply");
var cvExperience_1 = require("../models/cvExperience");
var cvSkill_1 = require("../models/cvSkill");
var cvCourse_1 = require("../models/cvCourse");
var mediaUserProfileCover_1 = require("../models/mediaUserProfileCover");
var talkMail_1 = require("../models/talkMail");
var chat_1 = require("../models/chat");
exports.db = new typeorm_1.DataSource({
    type: 'mysql',
    // Productions
    // host: "localhost",
    // username: "djoumaf",
    // password: "djoumaf-nray-20",
    // database: "nxs_djoumaf",
    // Developpement
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'nxs_djoumaf',
    port: 3306,
    entities: [
        user_1.User,
        jobs_1.Job,
        mediaUserProfile_1.Media,
        userProfile_1.Profile,
        parameterType_1.TypeParameter,
        parameter_1.Parameter,
        userPreference_1.Preference,
        cvModel_1.ModelCv,
        cvUser_1.UserCv,
        mediaUserProfileCV_1.MediaCv,
        mediaUserProfileCover_1.MediaCover,
        userRole_1.Role,
        jobToApply_1.ToApplyJob,
        cvExperience_1.ExperienceCv,
        cvCourse_1.CourseCV,
        cvSkill_1.SkillCv,
        talkMail_1.TalkMail,
        chat_1.Chat
    ],
    migrations: ['migration/*.js'],
    logging: false,
    synchronize: true,
    connectTimeout: 90000,
});
var startDb = function () {
    exports.db.initialize()
        .then(function () {
        console.log('Data Source has been initialized!');
    })
        .catch(function (err) {
        console.error('Error during Data Source initialization:', err);
    });
};
exports.startDb = startDb;
