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
exports.ModelCv = void 0;
const typeorm_1 = require("typeorm");
const mediaUserProfileCV_1 = require("./mediaUserProfileCV");
const cvUser_1 = require("./cvUser");
let ModelCv = class ModelCv {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ModelCv.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ModelCv.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ModelCv.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => mediaUserProfileCV_1.MediaCv, (cv) => cv.model_cv, { onDelete: "CASCADE" }),
    __metadata("design:type", mediaUserProfileCV_1.MediaCv)
], ModelCv.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cvUser_1.UserCv, (cv) => cv.model_cv, { cascade: true }),
    __metadata("design:type", cvUser_1.UserCv)
], ModelCv.prototype, "user_cv", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ModelCv.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ModelCv.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ModelCv.prototype, "deleted_at", void 0);
ModelCv = __decorate([
    (0, typeorm_1.Entity)("cv_models")
], ModelCv);
exports.ModelCv = ModelCv;
