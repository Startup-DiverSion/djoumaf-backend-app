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
exports.ExperienceCv = void 0;
var typeorm_1 = require("typeorm");
var parameter_1 = require("./parameter");
var user_1 = require("./user");
var cvSkill_1 = require("./cvSkill");
var ExperienceCv = /** @class */ (function () {
    function ExperienceCv() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ExperienceCv.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ExperienceCv.prototype, "slug", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ExperienceCv.prototype, "company_name", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return parameter_1.Parameter; }, function (parameter) { return parameter.type_parameter; }),
        __metadata("design:type", parameter_1.Parameter)
    ], ExperienceCv.prototype, "experience", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ExperienceCv.prototype, "date_start", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], ExperienceCv.prototype, "date_finish", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, type: 'boolean' }),
        __metadata("design:type", Boolean)
    ], ExperienceCv.prototype, "currently_working", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], ExperienceCv.prototype, "workplace", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'longtext' }),
        __metadata("design:type", String)
    ], ExperienceCv.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return cvSkill_1.SkillCv; }, function (sk) { return sk.parameter; }),
        __metadata("design:type", Array)
    ], ExperienceCv.prototype, "skill", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.profile; }, { cascade: true }),
        __metadata("design:type", user_1.User)
    ], ExperienceCv.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], ExperienceCv.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], ExperienceCv.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], ExperienceCv.prototype, "deleted_at", void 0);
    ExperienceCv = __decorate([
        (0, typeorm_1.Entity)("cv_experiences")
    ], ExperienceCv);
    return ExperienceCv;
}());
exports.ExperienceCv = ExperienceCv;
