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
exports.ToApplyJob = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var jobs_1 = require("./jobs");
var ToApplyJob = /** @class */ (function () {
    function ToApplyJob() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ToApplyJob.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return jobs_1.Job; }, function (job) { return job.to_apply; }),
        __metadata("design:type", jobs_1.Job)
    ], ToApplyJob.prototype, "job", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ToApplyJob.prototype, "job_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.job; }),
        __metadata("design:type", user_1.User)
    ], ToApplyJob.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], ToApplyJob.prototype, "user_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0 }),
        __metadata("design:type", Number)
    ], ToApplyJob.prototype, "limit", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], ToApplyJob.prototype, "is_apply", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], ToApplyJob.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], ToApplyJob.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], ToApplyJob.prototype, "deleted_at", void 0);
    ToApplyJob = __decorate([
        (0, typeorm_1.Entity)("job_to_apply")
    ], ToApplyJob);
    return ToApplyJob;
}());
exports.ToApplyJob = ToApplyJob;
