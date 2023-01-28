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
exports.User = void 0;
var typeorm_1 = require("typeorm");
var jobs_1 = require("./jobs");
var userPreference_1 = require("./userPreference");
var userProfile_1 = require("./userProfile");
var userRole_1 = require("./userRole");
var talkMail_1 = require("./talkMail");
var chat_1 = require("./chat");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "verify_email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "verify_email_expire", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "token", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return userProfile_1.Profile; }, function (profile) { return profile.user; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", userProfile_1.Profile)
    ], User.prototype, "profile", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'json', nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "signin_place", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'json', nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "signup_place", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'json', nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "device", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return userRole_1.Role; }, function (role) { return role.user; }),
        __metadata("design:type", userRole_1.Role)
    ], User.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return userPreference_1.Preference; }, function (preference) { return preference.user; }),
        __metadata("design:type", userPreference_1.Preference)
    ], User.prototype, "preference", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'json', nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "rest_password_code", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return jobs_1.Job; }, function (job) { return job.user; }),
        __metadata("design:type", jobs_1.Job)
    ], User.prototype, "job", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return talkMail_1.TalkMail; }, function (message) { return message.user; }),
        __metadata("design:type", talkMail_1.TalkMail)
    ], User.prototype, "message", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function (type) { return chat_1.Chat; }, function (chat) { return chat.users; }),
        (0, typeorm_1.JoinTable)({ name: 'chat_into_users' }),
        __metadata("design:type", Array)
    ], User.prototype, "chats", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "deleted_at", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)('users')
    ], User);
    return User;
}());
exports.User = User;
