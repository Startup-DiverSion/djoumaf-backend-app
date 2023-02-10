"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wareVerifyTokenUser = void 0;
const user_services_1 = require("../../services/user.services");
const wareVerifyTokenUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { getTokenWebID, getTokenUser } = yield user_services_1.default.current(req, res);
        if (getTokenWebID.toLowerCase().trim() != getTokenUser.email)
            return res.status(401).send({ message: "Accés interdit" });
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).send({ mesage: "invalid token", satut_code: 401 });
    }
});
exports.wareVerifyTokenUser = wareVerifyTokenUser;
