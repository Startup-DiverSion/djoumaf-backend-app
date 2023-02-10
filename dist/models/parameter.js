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
exports.Parameter = void 0;
const typeorm_1 = require("typeorm");
const parameterType_1 = require("./parameterType");
const userPreference_1 = require("./userPreference");
const jobs_1 = require("./jobs");
let Parameter = class Parameter {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Parameter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Parameter.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => parameterType_1.TypeParameter, (type) => type.parameter, { onDelete: 'CASCADE', }),
    __metadata("design:type", parameterType_1.TypeParameter)
], Parameter.prototype, "type_parameter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userPreference_1.Preference, (preference) => preference.parameter, { cascade: true }),
    __metadata("design:type", userPreference_1.Preference)
], Parameter.prototype, "preference", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => jobs_1.Job, (job) => job.field_activity, { cascade: true }),
    __metadata("design:type", jobs_1.Job)
], Parameter.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Parameter.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Parameter.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Parameter.prototype, "deleted_at", void 0);
Parameter = __decorate([
    (0, typeorm_1.Entity)("parameters")
], Parameter);
exports.Parameter = Parameter;
