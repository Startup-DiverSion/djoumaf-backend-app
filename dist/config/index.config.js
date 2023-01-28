"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppConfig = /** @class */ (function () {
    function AppConfig() {
    }
    AppConfig.prototype.database = function () {
        return {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "nxs0_likidon",
            entities: ["models/*.js"],
            logging: true,
            synchronize: true,
        };
    };
    AppConfig.prototype.mail = function () {
        return {};
    };
    return AppConfig;
}());
exports.default = new AppConfig();
