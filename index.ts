import 'reflect-metadata';
import 'dotenv/config';
import { Response, Request } from 'express';
import * as express from 'express';
import * as cors from 'cors';
import InitRoutes from './routes/index.route';
import { startDb } from './database/index.database';
import * as path from 'path';
const socket = require('socket.io');
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { env } from './config/env.config';
dotenv.config()

// create and setup express app
const app = express();


//middleware
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins:any = ['http://localhost:5173', 'https://djoumaf.com', 'https://djoumaf.net'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
// Then pass these options to cors:
app.use(cors());

app.use(express.json());


//MIDDLEWARE ROUTE
InitRoutes(app);
app.use("/images", express.static("public"));
app.use('/', express.static("templates"));

app.set('view engine', 'ejs');

// Server
let server: any;

const start = async () => {
   try {
      

      // STARTING OF SERVER APP
      server = app.listen(env.PORT, () => {
         console.log('Server started  => http://localhost:' + env.PORT);
      });

      // Socket setup
      const io = socket(server);

      io.on('connection', function (socket) {
         console.log('Made socket connection');

         socket.on('new user', function (data: any) {
            data = 'Mon premier message.';
            io.emit('new user', data);
         });
      });

      // CONNECTED TO DATABASE
      startDb();
   } catch (error) {
      console.error(error);
      process.exit(1);
   }
};

void start();
