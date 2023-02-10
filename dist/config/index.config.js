"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppConfig {
    constructor() {
    }
    database() {
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
    }
    mail() {
        return {};
    }
}
exports.default = new AppConfig();
