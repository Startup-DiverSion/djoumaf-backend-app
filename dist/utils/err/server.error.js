"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerError = /** @class */ (function () {
    function ServerError() {
    }
    ServerError.prototype.catchError = function (res, error) {
        return res.status(500).send({
            error: error
        });
    };
    /**
     * Data not insert to database
     */
    ServerError.prototype.notInsertToDatabase = function (res, error) {
        if (error === void 0) { error = { message: "Impossible d'effectuez cette action" }; }
        return res.status(500).send({
            message: error.message,
            error: true
        });
    };
    /**
    * Data not delete to database
    */
    ServerError.prototype.noDataMatches = function (res, error) {
        if (error === void 0) { error = { message: "Aucune donnée ne correspond" }; }
        return res.status(404).send({
            message: error.message,
            error: true
        });
    };
    return ServerError;
}());
exports.default = new ServerError();
