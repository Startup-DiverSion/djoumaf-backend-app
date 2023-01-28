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
var typeorm_1 = require("typeorm");
var mediaUserProfile_1 = require("./mediaUserProfile");
var user_1 = require("./user");
var jobs_1 = require("./jobs");
var parameter_1 = require("./parameter");
var mediaUserProfileCover_1 = require("./mediaUserProfileCover");
var Profile = /** @class */ (function () {
    function Profile() {
    }
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
        __metadata("design:type", String)
    ], Profile.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return parameter_1.Parameter; }, function (pref) { return pref.preference; }),
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
        (0, typeorm_1.OneToOne)(function () { return user_1.User; }, function (user) { return user.profile; }) // specify inverse side as a second parameter
        ,
        __metadata("design:type", user_1.User)
    ], Profile.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return user_1.User; }),
        (0, typeorm_1.JoinTable)({ name: "follow" }),
        __metadata("design:type", user_1.User)
    ], Profile.prototype, "follow", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return jobs_1.Job; }, function (job) { return job.profile; }),
        __metadata("design:type", jobs_1.Job)
    ], Profile.prototype, "job", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return mediaUserProfile_1.Media; }, function (media) { return media.profile; }),
        __metadata("design:type", mediaUserProfile_1.Media)
    ], Profile.prototype, "media_profile", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return mediaUserProfileCover_1.MediaCover; }, function (media) { return media.profile; }),
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
    return Profile;
}());
exports.Profile = Profile;
