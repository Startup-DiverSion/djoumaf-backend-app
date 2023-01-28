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
exports.UserCv = void 0;
var typeorm_1 = require("typeorm");
var cvModel_1 = require("./cvModel");
var user_1 = require("./user");
var UserCv = /** @class */ (function () {
    function UserCv() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], UserCv.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'integer' }),
        __metadata("design:type", Number)
    ], UserCv.prototype, "cv_default", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return cvModel_1.ModelCv; }, function (cv) { return cv.user_cv; }),
        __metadata("design:type", cvModel_1.ModelCv)
    ], UserCv.prototype, "model_cv", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.profile; }),
        __metadata("design:type", user_1.User)
    ], UserCv.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], UserCv.prototype, "created_at", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], UserCv.prototype, "updated_at", void 0);
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], UserCv.prototype, "deleted_at", void 0);
    UserCv = __decorate([
        (0, typeorm_1.Entity)("cv_user")
    ], UserCv);
    return UserCv;
}());
exports.UserCv = UserCv;
