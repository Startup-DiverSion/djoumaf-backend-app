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
const mediaUserProfile_1 = require("../models/mediaUserProfile");
const mediaUserProfileCover_1 = require("./../models/mediaUserProfileCover");
class MediaController {
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.send({});
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //
    create(req, res, profileID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                // Initialize the user profile
                const jMedia = index_database_1.db.getRepository(mediaUserProfile_1.Media);
                const jMediaCover = index_database_1.db.getRepository(mediaUserProfileCover_1.MediaCover);
                //  Media
                if (req.file) {
                    const newMedia = jMedia.create({
                        url: req.file.filename,
                        profile: profileID,
                    });
                    const saveMedia = yield jMedia.save(newMedia);
                    if (!saveMedia)
                        return server_error_1.default.notInsertToDatabase(res);
                }
                else {
                    const newMedia = jMedia.create({
                        url: null,
                        profile: profileID,
                    });
                    const saveMedia = yield jMedia.save(newMedia);
                    if (!saveMedia)
                        return server_error_1.default.notInsertToDatabase(res);
                }
                //  Media Cover
                const newMediaCover = jMediaCover.create({
                    url: null,
                    profile: profileID,
                });
                const saveMediaCover = yield jMediaCover.save(newMediaCover);
                if (!saveMediaCover)
                    return server_error_1.default.notInsertToDatabase(res);
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
                const { id, type } = req.body;
                // Initialize the user profile
                let jMedia;
                if (type === 'profile') {
                    jMedia = index_database_1.db.getRepository(mediaUserProfile_1.Media);
                }
                else if (type === 'cover') {
                    jMedia = index_database_1.db.getRepository(mediaUserProfileCover_1.MediaCover);
                }
                else {
                    return server_error_1.default.notInsertToDatabase(res);
                }
                //
                const updateMedia = jMedia.update({ profile: id }, {
                    url: req.file.filename,
                    profile: id,
                });
                if (!updateMedia)
                    return server_error_1.default.notInsertToDatabase(res);
                return res.send({ media_profile: true });
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new MediaController();
