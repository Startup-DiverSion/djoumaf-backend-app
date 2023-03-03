import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { User } from '../models/user';

class UserController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
         const query: any = req.query;

         const jUser = db.getRepository(User);
         let getAllUser: any = [];

         //    Limit

         if (query.limit && query.limit >= 0) {
            const limit = parseInt(query.limit);
            getAllUser = await jUser.find({ take: query.limit });
            return res.send({ parameter: getAllUser });
         }

         getAllUser = await jUser.find();
         return res.send({ users: getAllUser });
      } catch (error) {
         console.log(error);
      }
   }

   //
   public async indexQuery(req: Request, res: Response) {
      try {
         const query: any = req.query.type_parametre;

         // if(!query) return useValidateError.withoutInput(res)

         const xParametre = await db
            .getRepository(Parameter)
            .find({ relations: { type_parameter: true } });

         return res.send({ parameter: xParametre });
      } catch (error) {
         console.log(error);
      }
   }

   //
   public async show(req: Request, res: Response) {}

   //
   public async create(req: Request, res: Response, profileID: any) {
      try {
         // Init
         // Initialize the user profile
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new UserController();
