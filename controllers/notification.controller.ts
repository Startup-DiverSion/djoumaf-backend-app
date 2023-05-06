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
import { Notifications } from '../models/userNotification';

class NotificationController {
   //
   public async index(req: Request, res: Response) {
      try {
         //Init
         const { Auth } = await userServices.current(req, res);
         const jNotification = db.getRepository(Notifications);
         const jUser = db.getRepository(User);
         const relations = [
            'user.profile.media_profile',
            'receive.profile.media_profile',
            'notification_type'
         ];

         const __getNotify = await jNotification.find({
            relations,
         });

         const getNotify = [];
         __getNotify.forEach((notif) => {
            if (notif.receive.id == Auth.user.id) {
               getNotify.push(notif);
            }
         });

         res.status(201).send({ notifications: getNotify });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   //
   public async show(req: Request, res: Response, io: any) {
      try {
         res.sendStatus(201);
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   public async create(req: Request, res: Response, io: any) {
      try {
         const { Auth } = await userServices.current(req, res);
         const { type, recevie_id, content, provide_id, redirect } = req.body;
         const relations = [
            'user.profile.media_profile',
            'receive.profile.media_profile',
         ];

         const jNotification = db.getRepository(Notifications);
         const newNotification = jNotification.create({
            notification_type: type,
            user: Auth.user.id,
            receive: recevie_id,
            content,
            redirect,
            provide_id,
            description: type === 238 ? "à postuler à votre offre d'emploi." :  type === 239 ? 'Vous suit désormais' : type === 240 ? "s'est Désabonner de vous" : `Vous à envoyer un message.`,
            objt: type === 238 ? "Offre d'emploi" : type === 239 ? 'Abonnement' : type === 240 ? 'Désabonnement' :  null
         });

         const saveNotify: any = await jNotification.save(newNotification);

         if (saveNotify) {
            const getRecentlyNotify:any = await jNotification.findOne({
               where: { id: saveNotify.id },
               relations,
            });
            getRecentlyNotify.type = type
            io.emit('chat-message-notification', getRecentlyNotify);
            
         }

         res.status(201).send({ success: true });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   public async updateDistributionAll(req: Request, res: Response) {
      try {
         const { Auth } = await userServices.current(req, res);
         const { type, recevie_id, content } = req.body;

         const jNotification = db.getRepository(Notifications);
         jNotification.update(
            { receive: Auth.user.id },
            {
               distribution_all: true,
            }
         );

         res.status(201).send({ update_distribution_all: true });
      } catch (error) {
         console.log(error);
         serverError.catchError(res, error);
      }
   }

   public async updateDistribution(req: Request, res: Response) {
      try {
         const { Auth } = await userServices.current(req, res);
         const { id } = req.body;

         const jNotification = db.getRepository(Notifications);
         jNotification.update(
            { id },
            {
               distribution: true,
            }
         );

         res.status(201).send({ update_distribution: true });
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

export default new NotificationController();
