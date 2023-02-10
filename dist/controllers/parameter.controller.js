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
const index_database_1 = require("../database/index.database");
const server_error_1 = require("../utils/err/server.error");
const parameter_1 = require("../models/parameter");
class ArticleController {
    constructor() { }
    //
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const xParametre = yield index_database_1.db
                    .getRepository(parameter_1.Parameter)
                    .find({ relations: { type_parameter: true } });
                return res.send({ parameter: xParametre });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //
    indexQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.type_parametre;
                // if(!query) return useValidateError.withoutInput(res)
                const xParametre = yield index_database_1.db
                    .getRepository(parameter_1.Parameter)
                    .find({ relations: { type_parameter: true } });
                return res.send({ parameter: xParametre });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //
    create(req, res, profileID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Init
                // Initialize the user profile
            }
            catch (error) {
                server_error_1.default.catchError(res, error);
            }
        });
    }
    //
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    //
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = new ArticleController();
