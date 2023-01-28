"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientError = /** @class */ (function () {
    function ClientError() {
    }
    /**
    * Data not delete to database
    */
    ClientError.prototype.canNotExecute = function (res, error) {
        if (error === void 0) { error = { message: "Aucune donnée ne correspond" }; }
        return res.status(400).send({
            message: error.message,
            error: true
        });
    };
    /**
   * Data already been executed
   */
    ClientError.prototype.alreadyBeenExecuted = function (res, error) {
        if (error === void 0) { error = { message: "Cette request à dèja été executer..." }; }
        return res.status(400).send({
            message: error.message,
            error: true
        });
    };
    return ClientError;
}());
exports.default = new ClientError();
