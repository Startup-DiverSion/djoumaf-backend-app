"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const mediaUserProfile_1 = require("./mediaUserProfile");
const user_1 = require("./user");
const jobs_1 = require("./jobs");
const parameter_1 = require("./parameter");
const mediaUserProfileCover_1 = require("./mediaUserProfileCover");
let Profile = class Profile {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "full_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: "longtext" }),
    __metadata("design:type", Object)
], Profile.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_1.Parameter, (pref) => pref.preference, { onDelete: 'CASCADE', }),
    __metadata("design:type", parameter_1.Parameter)
], Profile.prototype, "type_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Profile.prototype, "born", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], Profile.prototype, "lvl", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_1.User, (user) => user.profile) // specify inverse side as a second parameter
    ,
    __metadata("design:type", user_1.User)
], Profile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobs_1.Job, (job) => job.profile, { cascade: true }),
    __metadata("design:type", jobs_1.Job)
], Profile.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mediaUserProfile_1.Media, (media) => media.profile, { cascade: true }),
    __metadata("design:type", mediaUserProfile_1.Media)
], Profile.prototype, "media_profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => mediaUserProfileCover_1.MediaCover, (media) => media.profile, { cascade: true }),
    __metadata("design:type", mediaUserProfileCover_1.MediaCover)
], Profile.prototype, "media_profile_cover", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Profile.prototype, "deleted_at", void 0);
Profile = __decorate([
    (0, typeorm_1.Entity)("user_profiles")
], Profile);
exports.Profile = Profile;
