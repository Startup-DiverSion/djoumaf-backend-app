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
exports.slugGetter = void 0;
const slugify_1 = require("slugify");
const index_database_1 = require("../../database/index.database");
const slugGetter = (res, value, Model) => __awaiter(void 0, void 0, void 0, function* () {
    let slugExist;
    let slug;
    do {
        // Defined the letter associated
        const letter = 'd j o u m a f'.split(' ');
        const letterRamdom = Math.floor(Math.random() * letter.length);
        // Defined the slug of profile
        slug = `${(0, slugify_1.default)(value, '_')}_${Math.floor(Math.random() * 10000)}${letter[letterRamdom]}`.toLowerCase();
        // Get profile
        slugExist = yield index_database_1.db.getRepository(Model).findOne({ where: { slug } });
        if (slugExist)
            return { jSlug: null };
    } while (slugExist);
    //
    return { jSlug: slug };
});
exports.slugGetter = slugGetter;
