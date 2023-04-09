import { Request, Response } from 'express';
import { db } from '../database/index.database';
import { Profile } from '../models/userProfile';
import serverError from '../utils/err/server.error';
import { Parameter } from '../models/parameter';
import useValidateError from '../utils/err/input.error';
import { skills } from '../skills';

class ArticleController {
   constructor() {}

   //
   public async index(req: Request, res: Response) {
      try {
         const query: any = req.query;
         const xParametre = await db
            .getRepository(Parameter)
            .find({ relations: { type_parameter: true } });

       

            return res.send({ parameter: xParametre });
        
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
   public async createAddSkills(req: Request, res: Response, profileID: any) {
      try {
         // Init
         const jParams = db.getRepository(Parameter)
         const typeParms:any = 7

         

         // Initialize the paramate
         skills.forEach((el) => {
            const newParms = jParams.create({
               title: el,
               type_parameter: typeParms
            })
             jParams.save(newParms)
         })
        
       
         return res.status(201).send({Result: 'fait'})
       
      } catch (error) {
         serverError.catchError(res, error);
      }
   }

   //
   public async update(req: Request, res: Response) {}

   //
   public async delete(req: Request, res: Response) {}
}

export default new ArticleController();
