import 'reflect-metadata';
import 'dotenv/config';
import { Request, Response } from 'express';
import * as cors from 'cors';
import InitRoutes from './routes/index.route';
import { db, startDb } from './database/index.database';
import * as path from 'path';

import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { env } from './config/env.config';
import chatController from './controllers/chat.controller';
import { ChatMessage } from './models/chatMessage';
import { wareVerifyTokenUser } from './middlewares/auth/ware.verifyToken';

dotenv.config();

// create and setup express app
const express = require('express');
const app = express();

import { createServer } from 'http';
import { Server } from 'socket.io';
import notificationController from './controllers/notification.controller';

const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST'],
   },
   connectTimeout: 100000,
   pingInterval: 90000,
   pingTimeout: 300000,
   upgradeTimeout: 200000
});

//middleware
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins: any = [
   'http://localhost:5173',
   'http://localhost:8080/socket.io/',
   'https://djoumaf.com',
   'https://djoumaf.net',
];

const options: cors.CorsOptions = {
   origin: allowedOrigins,
};
// Then pass these options to cors:
app.use(cors(options));

app.use(express.json());

//MIDDLEWARE ROUTE
InitRoutes(app);
app.use('/images', express.static('public'));
app.use('/', express.static('templates'));

app.set('view engine', 'ejs');


   app.post(
      '/api/messages',
      wareVerifyTokenUser,
      (req: Request, res: Response) => {
         chatController.create(req, res, io);
      }
   );
   app.post(
      '/api/chat/group',
      wareVerifyTokenUser,
      (req: Request, res: Response) => {
         chatController.createGroup(req, res, io);
      }
   );
   app.post(
      '/api/messages/show',
      wareVerifyTokenUser,
      (req: Request, res: Response) => {
         chatController.show(req, res, io);
      }
   );
   
   app.post(
      '/api/notification/create',
      wareVerifyTokenUser,
      (req: Request, res: Response) => {
         notificationController.create(req, res, io);
      }
   );



const start = async () => {
   try {
      

      io.on('connection', (socket) => {
  console.log('a user connected');
});

      // STARTING OF SERVER APP
      httpServer.listen(env.PORT, () => {
         console.log('Server started  => http://localhost:' + env.PORT);
      });

      // CONNECTED TO DATABASE
      startDb();
      

   } catch (error) {
      console.error(error);
      process.exit(1);
   }
};



void start();
