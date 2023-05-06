import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { skills } from '../skills';
import { ChatMessage } from '../models/chatMessage';
import userServices from '../services/user.services';
import { ChatMessageGroup } from '../models/chatMessageGroup';
import { User } from '../models/user';

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
   cors: {
      origin: '*',
      methods: ['GET', 'POST'],
   },
});

class ChatController {
   //
   public async index(req: Request, res: Response) {
      try {
         //Init
         const { Auth } = await userServices.current(req, res);

         const jChatMessage = db.getRepository(ChatMessage);
         const jChatGroup = db.getRepository(ChatMessageGroup);
         const relations = [
            'userEmit',
            'userEmit.profile',
            'userEmit.profile.media_profile',
            'userOn',
            'userOn.profile',
            'userOn.profile.media_profile',
            'message',
            'message.user',
         ];

         let getGroup: any = await jChatGroup.find({ relations: relations });
         let getUserID: any;

         getGroup.forEach((chat, index) => {
            chat.display =
               Auth.user.id === chat.userEmit.id ? chat.userOn : chat.userEmit;
            chat.owner =
               Auth.user.id !== chat.userEmit.id ? chat.userOn : chat.userEmit;
            chat.last_message = chat.message.slice(-1);
            getGroup[index].no_view = 0;
            chat.message.forEach((msg) => {
               if (msg.view === false && msg.user.id !== Auth.user.id) {
                  getGroup[index].no_view = getGroup[index].no_view + 1;
               }
            });
         });

         getGroup = getGroup.filter((gp) => {
            return (
               gp.userEmit.id == Auth.user.id || gp.userOn.id == Auth.user.id
            );
         });

         const messages = await jChatMessage.find({
            relations: { chat_group: true },
         });
         res.send({ messages, getGroup });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   //
   public async show(req: Request, res: Response, io: any) {
      try {
         //Init
         const { chatID, display } = req.body;
         const { Auth } = await userServices.current(req, res);

         const jChatMessage = db.getRepository(ChatMessage);
         const jChatGroup = db.getRepository(ChatMessageGroup);
         const relations = [
            'userEmit',
            'userEmit.profile',
            'userEmit.profile.media_profile',
            'userOn',
            'userOn.profile',
            'userOn.profile.media_profile',
            'message',
            'message.user',
            'message.user.profile',
            'message.user.profile.media_profile',
         ];

         const getAllMessage = await jChatMessage.find({
            where: { chat_group: chatID, view: false },
            relations: { user: true, chat_group: true },
         });
         let isMessageToChange = false;

         const toDisplay: any = getAllMessage.find((msg) => {
            return Auth.user.id !== msg.user.id;
         });

         if (toDisplay) {
            await jChatMessage.update(
               {
                  user: toDisplay.user.id,
                  chat_group: chatID,
               },
               { view: true }
            );

         }

               const getGroupSingle: any = await jChatGroup.findOne({
                  where: { id: chatID },
                  relations: relations,
               });

               getGroupSingle.display =
                  Auth.user.id === getGroupSingle.userEmit.id
                     ? getGroupSingle.userOn
                     : getGroupSingle.userEmit;

               getGroupSingle.owner =
                  Auth.user.id !== getGroupSingle.userEmit.id
                     ? getGroupSingle.userOn
                     : getGroupSingle.userEmit;

               getGroupSingle.no_view = 0;
               io.emit('chat_view', chatID, Auth.user.id);
               res.send({ getGroupSingle });
            
       
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   public async create(req: Request, res: Response, io: any) {
      try {
         //Init
         const { Auth } = await userServices.current(req, res);

         // Get the informations entry request
         const { message, to } = req.body;
         const jChatGroup = db.getRepository(ChatMessageGroup);
         const jUser = db.getRepository(User);

         let chatID: any;
         const getChatGroup: any = await jChatGroup.findOne({
            where: [
               { name: Auth.user.id + '_InChatGroup_' + to },
               { name: to + '_InChatGroup_' + Auth.user.id },
            ],
         });

         if (getChatGroup) {
            chatID = getChatGroup.id;
         }

         const jChatMessage = db.getRepository(ChatMessage);
         const jNewMessage = jChatMessage.create({
            message,
            chat_group: chatID,
            user: Auth.user.id,
         });
         const saveChatMessage = await jChatMessage.save(jNewMessage);

         if (saveChatMessage) {
            const relations = [
               'userEmit.profile.media_profile',
               'userOn.profile.media_profile',
               'message.user.profile.media_profile',
            ];

            const getGroupSingle: any = await jChatGroup.findOne({
               where: { id: chatID },
               relations: relations,
            });

            io.emit(
               'message',
               getGroupSingle.message[getGroupSingle.message.length - 1],
               chatID
            );

            io.emit('chat_view_message', chatID, Auth.user.id);
            // Send Notifitcation For message

            res.status(201).send({ chatMessage: getGroupSingle, chatID });
         }
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   // Create Group !
   public async createGroup(req: Request, res: Response, io: any) {
      try {
         //Init
         const { Auth } = await userServices.current(req, res);

         // Get the informations entry request
         const { to } = req.body;
         const jChatGroup = db.getRepository(ChatMessageGroup);
         const jUser = db.getRepository(User);

         let chatID: any;
         const getChatGroup: any = await jChatGroup.findOne({
            where: [
               { name: Auth.user.id + '_InChatGroup_' + to },
               { name: to + '_InChatGroup_' + Auth.user.id },
            ],
         });

         if (!getChatGroup) {
            // Create new chat
            const newChat = jChatGroup.create({
               name: Auth.user.id + '_InChatGroup_' + to,
               userEmit: Auth.user.id,
               userOn: to,
            });
            const saveChat = await jChatGroup.save(newChat);

            //

            chatID = saveChat.id;
         } else {
            chatID = getChatGroup.id;
         }

         if (chatID) {
            const relations = [
               'userEmit',
               'userEmit.profile',
               'userEmit.profile.media_profile',
               'userOn',
               'userOn.profile',
               'userOn.profile.media_profile',
               'message',
               'message.user',
               'message.user.profile',
               'message.user.profile.media_profile',
            ];

            const getGroupSingle: any = await jChatGroup.findOne({
               where: { id: chatID },
               relations: relations,
            });

            getGroupSingle.display =
               Auth.user.id !== getGroupSingle.userEmit.id
                  ? getGroupSingle.userOn
                  : getGroupSingle.userEmit;

            getGroupSingle.owner =
               Auth.user.id == getGroupSingle.userEmit.id
                  ? getGroupSingle.userOn
                  : getGroupSingle.userEmit;
            getGroupSingle.last_message = getGroupSingle.message.slice(-1);

            io.emit('group', getGroupSingle);

            res.status(201).send({ chat_id: getGroupSingle.id });
         }
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new ChatController();
