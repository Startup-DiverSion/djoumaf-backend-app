import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { db } from '../database/index.database';
import { User } from '../models/user';
import { env } from '../config/env.config';

class UserService {
   public async current(req: any = Request, res: any = Response) {
      const getTokenWeb = req.headers.authorization;
      let isNotUser = null

      // VERIFY IF TOKEN EXISTS
      if (!getTokenWeb){
         isNotUser = true
         return res.status(401).send({ message: 'Accés interdit' });
      }
         

      const verified: any = jwt.verify(getTokenWeb, env.SECRET_TOKEN);
      req.header = verified;

      // GET ID IN TOKEN WEB
      const getTokenWebID = jwt.decode(getTokenWeb, {
         complete: true,
      }).payload['_id'];


      const getTokenUser = await db.getRepository(User).findOne({
         where: { email: getTokenWebID.toLowerCase().trim() },
      });

      return { getTokenWebID, getTokenUser, Auth: { user: getTokenUser }, isNotUser };
   }
}

export default new UserService();
