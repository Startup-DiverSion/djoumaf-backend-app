"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDb = exports.db = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("../models/user");
const jobs_1 = require("../models/jobs");
const mediaUserProfile_1 = require("../models/mediaUserProfile");
const userProfile_1 = require("../models/userProfile");
const parameterType_1 = require("../models/parameterType");
const parameter_1 = require("../models/parameter");
const userPreference_1 = require("../models/userPreference");
const cvModel_1 = require("../models/cvModel");
const cvUser_1 = require("../models/cvUser");
const mediaUserProfileCV_1 = require("../models/mediaUserProfileCV");
const userRole_1 = require("../models/userRole");
const jobToApply_1 = require("../models/jobToApply");
const cvExperience_1 = require("../models/cvExperience");
const cvSkill_1 = require("../models/cvSkill");
const cvCourse_1 = require("../models/cvCourse");
const mediaUserProfileCover_1 = require("../models/mediaUserProfileCover");
const talkMail_1 = require("../models/talkMail");
const chat_1 = require("../models/chat");
const env_config_1 = require("../config/env.config");
const userFollow_1 = require("../models/userFollow");
const userActivityLog_1 = require("../models/userActivityLog");
exports.db = new typeorm_1.DataSource({
    type: 'mysql',
    host: env_config_1.env.HOST,
    username: env_config_1.env.USERNAME,
    password: env_config_1.env.PASSWORD,
    database: env_config_1.env.DATABASE,
    charset: env_config_1.env.CHARSET,
    port: env_config_1.env.PORT_DB,
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
        chat_1.Chat,
        userFollow_1.Follow,
        userActivityLog_1.ActivityLog
    ],
    migrations: ['migration/*.js'],
    logging: false,
    synchronize: true,
});
const startDb = () => {
    exports.db.initialize()
        .then(() => {
        console.log('Data Source has been initialized!');
    })
        .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
};
exports.startDb = startDb;
