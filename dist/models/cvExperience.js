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
const typeorm_1 = require("typeorm");
const parameter_1 = require("./parameter");
const user_1 = require("./user");
const cvSkill_1 = require("./cvSkill");
let ExperienceCv = class ExperienceCv {
};
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
    (0, typeorm_1.ManyToOne)(() => parameter_1.Parameter, (parameter) => parameter.type_parameter, { onDelete: 'CASCADE', }),
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
    (0, typeorm_1.ManyToOne)(() => cvSkill_1.SkillCv, (sk) => sk.parameter, { onDelete: 'CASCADE', }),
    __metadata("design:type", Array)
], ExperienceCv.prototype, "skill", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.profile, { onDelete: 'CASCADE', }),
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
exports.ExperienceCv = ExperienceCv;
