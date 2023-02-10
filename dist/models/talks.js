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
exports.Talks = void 0;
const typeorm_1 = require("typeorm");
const talkMessage_1 = require("./talkMessage");
const user_1 = require("./user");
let Talks = class Talks {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Talks.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Talks.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_1.User),
    (0, typeorm_1.JoinTable)({ name: "user_in_talks" }),
    __metadata("design:type", user_1.User)
], Talks.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => talkMessage_1.Message, (message) => message.talk, { cascade: true }),
    __metadata("design:type", talkMessage_1.Message)
], Talks.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Talks.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Talks.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Talks.prototype, "deleted_at", void 0);
Talks = __decorate([
    (0, typeorm_1.Entity)("talks")
], Talks);
exports.Talks = Talks;
