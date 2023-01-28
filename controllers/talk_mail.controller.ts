import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Job } from '../models/jobs';
import serverError from '../utils/err/server.error';
import { TalkMail } from '../models/talkMail';
import userServices from '../services/user.services';
import useValidateError from '../utils/err/input.error';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { Chat } from '../models/chat';

interface BODY_RESQUEST {
   subject: any;
   receiver: any;
   message: string;
}

class TalkMailController {
   public async index(req: Request, res: Response) {
      // Init
      const jTalkMail = db.getRepository(TalkMail);

      // Get the informations entry request

      // Get job data based on id
      const getAll = await jTalkMail.find({
         relations: ['user', 'user.profile.media_profile', 'receiver'],
      });
      if (!getAll) return serverError.noDataMatches(res);

      // Return Data
      return res.status(201).send({ talk_mails: getAll });
   }

   public async show(req: Request, res: Response) {
      // Init
      const { id } = req.body;
      // Get the informations entry request

      // Get job data based on id

      // Return Data
      return res.status(201).send();
   }

   public async create(req: Request, res: Response, reqBoy: BODY_RESQUEST) {
      // Init
      const jTalkMail = db.getRepository(TalkMail);
      const jUser = db.getRepository(User);
      const jChat = db.getRepository(Chat);
      const { Auth } = await userServices.current(req, res);

      // Get the informations entry request
      const { receiver, subject, message } = reqBoy;

      // VERIFY IF SIGN MAIL IS ALREADY EXISTS IN DATABASE
      let xSignMail: any;
      let signMail: any;

      do {
         xSignMail = jwt.sign(
            { _id: Auth.user.id },
            process.env.SECRET_SIGN_MAIL
         );
         signMail = await jTalkMail.findOne({ where: { sign: xSignMail } });
      } while (signMail);

      // Verify if chat exist in database
      let chatID:any;
      const checkIfChatExist = await jChat.findOne({
         where: { name: Auth.user.username + '_InChat' + receiver.username },
      });
      

      // Check
      if (!checkIfChatExist) {
         // Create new chat
         const newChat = jChat.create({
            name: Auth.user.username + '_InChat' + receiver.username,
         });
         const saveChat = await jChat.save(newChat);

         // 
         const userSendMail = await jUser.findOne({where: { id : Auth.user.id}})
         userSendMail.chats = [saveChat];
         await jUser.save(userSendMail);

         const userReceiverMail = await jUser.findOne({where: { id : receiver.id}})
         userReceiverMail.chats = [saveChat];
         await jUser.save(userReceiverMail);

         // 
         
         chatID = saveChat.id
      }else{
         chatID = checkIfChatExist.id
      }

      // Create
      const newTalkMail = jTalkMail.create({
         from: Auth.user.email,
         sign: xSignMail,
         subject,
         message,
         user: Auth.user.id,
         chat: chatID
      });
      const saveTalkMail = await jTalkMail.save(newTalkMail);


      

 

      return { saveTalkMail };

      // Return Data
      // return res.status(201).send();
   }

   public async delete(req: Request, res: Response) {
      // Init

      // Get the informations entry request

      // Get job data based on id

      // Return Data
      return res.status(201).send();
   }

   /** */
   public async indexInTermsOfUserConnected(req: Request, res: Response) {
      // Init
      const jTalkMail = db.getRepository(TalkMail);

      // Get the informations entry request
      const { Auth } = await userServices.current(req, res);

      // Get job data based on id
      const getAll = await jTalkMail.find({
         where: { user: Auth.user.id },
         relations: ['user', 'user.profile.media_profile', 'user'],
      });
      if (!getAll) return serverError.noDataMatches(res);

      // Return Data
      return res.status(201).send({ talk_mails: getAll });
   }

   /** */
   public async allUserToSendEmail(req: Request, res: Response) {
      // Init
      const jUser = db.getRepository(User);
      const JChat = db.getRepository(Chat)

      // Get the informations entry request
      const { Auth } = await userServices.current(req, res);

      // Get job data based on id

      let getAll = await JChat.find({
        relations: {users: true, message: true}
      });

      getAll =  getAll.filter((el:any) => {
          return el?.users[0]?.id === Auth.user.id
      })
      if (!getAll) return serverError.noDataMatches(res);

      // Return Data
      return res.status(201).send({ talk_mails: getAll });
   }
}

export default new TalkMailController();
