"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientError {
    constructor() {
    }
    /**
    * Data not delete to database
    */
    canNotExecute(res, error = { message: "Aucune donnée ne correspond" }) {
        return res.status(400).send({
            message: error.message,
            error: true
        });
    }
    /**
   * Data already been executed
   */
    alreadyBeenExecuted(res, error = { message: "Cette request à dèja été executer..." }) {
        return res.status(400).send({
            message: error.message,
            error: true
        });
    }
}
exports.default = new ClientError();
