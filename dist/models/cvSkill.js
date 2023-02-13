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
exports.SkillCv = void 0;
const typeorm_1 = require("typeorm");
const parameter_1 = require("./parameter");
const user_1 = require("./user");
const parameterType_1 = require("./parameterType");
const cvExperience_1 = require("./cvExperience");
let SkillCv = class SkillCv {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SkillCv.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameter_1.Parameter, (type) => type.preference, { onDelete: 'CASCADE', }),
    __metadata("design:type", Array)
], SkillCv.prototype, "parameter", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameterType_1.TypeParameter, (type) => type.parameter, { onDelete: 'CASCADE', }),
    __metadata("design:type", parameterType_1.TypeParameter)
], SkillCv.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (type) => type.preference, { onDelete: 'CASCADE', }),
    __metadata("design:type", user_1.User)
], SkillCv.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cvExperience_1.ExperienceCv, (type) => type.skill, { onDelete: 'CASCADE', }),
    __metadata("design:type", cvExperience_1.ExperienceCv)
], SkillCv.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SkillCv.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SkillCv.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], SkillCv.prototype, "deleted_at", void 0);
SkillCv = __decorate([
    (0, typeorm_1.Entity)("cv_skills")
], SkillCv);
exports.SkillCv = SkillCv;
