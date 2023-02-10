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
require("reflect-metadata");
require("dotenv/config");
const express = require("express");
const cors = require("cors");
const index_route_1 = require("./routes/index.route");
const index_database_1 = require("./database/index.database");
const socket = require('socket.io');
const dotenv = require("dotenv"); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const env_config_1 = require("./config/env.config");
dotenv.config();
// create and setup express app
const app = express();
//middleware
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:5173', 'https://djoumaf.com', 'https://djoumaf.net'];
const options = {
    origin: allowedOrigins
};
// Then pass these options to cors:
app.use(cors());
app.use(express.json());
//MIDDLEWARE ROUTE
(0, index_route_1.default)(app);
app.use("/images", express.static("public"));
app.use('/', express.static("templates"));
app.set('view engine', 'ejs');
// Server
let server;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // STARTING OF SERVER APP
        server = app.listen(env_config_1.env.PORT, () => {
            console.log('Server started  => http://localhost:' + env_config_1.env.PORT);
        });
        // Socket setup
        const io = socket(server);
        io.on('connection', function (socket) {
            console.log('Made socket connection');
            socket.on('new user', function (data) {
                data = 'Mon premier message.';
                io.emit('new user', data);
            });
        });
        // CONNECTED TO DATABASE
        (0, index_database_1.startDb)();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
void start();
