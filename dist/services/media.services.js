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
const mediaUserProfile_1 = require("../models/mediaUserProfile");
const mediaUserProfileCover_1 = require("../models/mediaUserProfileCover");
class MediaService {
    profile(mediaID) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const jMedia = index_database_1.db.getRepository(mediaUserProfile_1.Media);
            //
            const getImageProfile = yield jMedia.findOne({ where: { id: mediaID } });
            if (!getImageProfile)
                return { media_profile: null };
            console.log(mediaID);
            return { media_profile: getImageProfile };
        });
    }
    profileCover(mediaID) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init
            const jMediaCover = index_database_1.db.getRepository(mediaUserProfileCover_1.MediaCover);
            //
            const getImageProfile = yield jMediaCover.findOne({ where: { id: mediaID } });
            if (!getImageProfile)
                return { media_profile: null };
            return { media_profile_cover: getImageProfile };
        });
    }
}
exports.default = new MediaService();
