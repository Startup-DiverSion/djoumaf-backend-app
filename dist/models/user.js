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
const typeorm_1 = require("typeorm");
const jobs_1 = require("./jobs");
const userPreference_1 = require("./userPreference");
const userProfile_1 = require("./userProfile");
const userRole_1 = require("./userRole");
const talkMail_1 = require("./talkMail");
const chat_1 = require("./chat");
const userFollow_1 = require("./userFollow");
let User = class User {
};
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
    (0, typeorm_1.OneToOne)(() => userProfile_1.Profile, (profile) => profile.user, { eager: true, cascade: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", userProfile_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "signin_place", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "signup_place", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userRole_1.Role, (role) => role.user, { onDelete: 'CASCADE', }),
    __metadata("design:type", userRole_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userPreference_1.Preference, (preference) => preference.user, { cascade: true }),
    __metadata("design:type", userPreference_1.Preference)
], User.prototype, "preference", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "rest_password_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "verify_code_expire", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobs_1.Job, (job) => job.user, { cascade: true }),
    __metadata("design:type", jobs_1.Job)
], User.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => talkMail_1.TalkMail, (message) => message.user, { cascade: true }),
    __metadata("design:type", talkMail_1.TalkMail)
], User.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => chat_1.Chat, chat => chat.users),
    (0, typeorm_1.JoinTable)({ name: 'chat_into_users' }),
    __metadata("design:type", Array)
], User.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => userFollow_1.Follow, follow => follow.users),
    (0, typeorm_1.JoinTable)({ name: 'follow_into_users' }),
    __metadata("design:type", Array)
], User.prototype, "follows", void 0);
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
exports.User = User;
