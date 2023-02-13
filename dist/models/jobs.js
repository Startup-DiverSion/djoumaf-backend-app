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
exports.Job = void 0;
const typeorm_1 = require("typeorm");
const userProfile_1 = require("./userProfile");
const user_1 = require("./user");
const parameter_1 = require("./parameter");
const jobToApply_1 = require("./jobToApply");
let Job = class Job {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_1.Parameter, (type) => type.job, { onDelete: 'CASCADE', }),
    __metadata("design:type", parameter_1.Parameter)
], Job.prototype, "field_activity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_1.Parameter, (type) => type.job, { onDelete: 'CASCADE', }),
    __metadata("design:type", parameter_1.Parameter)
], Job.prototype, "work_place", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_1.Parameter, (type) => type.job, { onDelete: 'CASCADE', }),
    __metadata("design:type", parameter_1.Parameter)
], Job.prototype, "contract_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Job.prototype, "dead_line", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext' }),
    __metadata("design:type", Object)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.job, { onDelete: 'CASCADE' }),
    __metadata("design:type", userProfile_1.Profile)
], Job.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userProfile_1.Profile, (profile) => profile.job, { onDelete: 'CASCADE' }),
    __metadata("design:type", userProfile_1.Profile)
], Job.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobToApply_1.ToApplyJob, apply => apply.job, { cascade: true }),
    __metadata("design:type", jobToApply_1.ToApplyJob)
], Job.prototype, "to_apply", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Job.prototype, "deleted_at", void 0);
Job = __decorate([
    (0, typeorm_1.Entity)("jobs")
], Job);
exports.Job = Job;
