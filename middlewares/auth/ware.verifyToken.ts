import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { db } from '../../database/index.database';
import { User } from '../../models/user';
import userServices from '../../services/user.services';

export const wareVerifyTokenUser = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { getTokenWebID, getTokenUser } = await userServices.current(
         req,
         res
      );

      if (getTokenWebID.toLowerCase().trim() != getTokenUser.email)
         return res.status(401).send({ message: 'Accés interdit' });

      next();
   } catch (error) {
      console.log(error);
      res.status(401).send({ mesage: 'invalid token', satut_code: 401 });
   }
};
