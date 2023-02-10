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
const jobToApply_1 = require("../models/jobToApply");
const user_services_1 = require("../services/user.services");
const talk_mail_controller_1 = require("./talk_mail.controller");
const user_1 = require("../models/user");
class ToApplyController {
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                const jToApply = index_database_1.db.getRepository(jobToApply_1.ToApplyJob);
                const { jobID, userID } = req.body;
                // Initialize
                // Get by specific selection one Apply data
                const getToApply = userID
                    ? yield jToApply.findOne({
                        where: { user_id: userID, job_id: jobID },
                    })
                    : yield jToApply.findOne({
                        where: { user_id: userID, job_id: jobID },
                    });
                // Get length of user apply this jobs
                const getCount = yield jToApply.countBy({ job_id: jobID });
                if (!getToApply)
                    return res.send({ to_apply_job: null, count: getCount });
                // Return
                return res.send({ to_apply_job: getToApply, count: getCount });
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
                const { jobID } = req.body;
                let newToApply;
                let updateToApply;
                // Initialize
                const jToApply = index_database_1.db.getRepository(jobToApply_1.ToApplyJob);
                const jUser = index_database_1.db.getRepository(user_1.User);
                const { Auth } = yield user_services_1.default.current(req, res);
                //Get first apply  > User and Job
                const ifAllwaysApply = yield jToApply.findOne({
                    where: [{ user_id: Auth.user.id, job_id: jobID }],
                });
                // Verify if user allways to apply on post
                if (ifAllwaysApply) {
                    updateToApply = yield jToApply.update({ id: ifAllwaysApply.id }, {
                        limit: ifAllwaysApply.limit + 1,
                        is_apply: ifAllwaysApply.is_apply ? false : true,
                    });
                    if (updateToApply.affected)
                        return res.send({
                            to_apply_job: yield jToApply.findOne({
                                where: { user: Auth.user.id, job: jobID },
                            }),
                        });
                }
                //  Create an new apply by current user on post
                newToApply = jToApply.create({
                    job: jobID,
                    job_id: jobID,
                    user: Auth.user,
                    user_id: Auth.user.id,
                    is_apply: true,
                    limit: 1,
                });
                const saveToApply = yield jToApply.save(newToApply);
                //  If not insert on database
                if (!saveToApply)
                    return server_error_1.default.notInsertToDatabase(res, { message: '' });
                // Get user whose id job => jobID
                const userOwnerOfPost = yield jUser.findOne({
                    where: { job: jobID },
                    relations: ['profile'],
                });
                if (!userOwnerOfPost)
                    return server_error_1.default.noDataMatches(res);
                // Send DjMail to notified the apply user
                const { saveTalkMail } = yield talk_mail_controller_1.default.create(req, res, {
                    receiver: userOwnerOfPost,
                    subject: `Vous avez recu une nouvelle condidacture.`,
                    message: `
               <h1>Hello ${userOwnerOfPost.profile.first_name}</h1>
               <a href="#">Voir son profile</a>
            `,
                });
                if (!saveTalkMail)
                    return server_error_1.default.notInsertToDatabase(res);
                // Send
                return res.send({ to_apply_job: saveToApply });
            }
            catch (error) {
                console.log(error);
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new ToApplyController();
