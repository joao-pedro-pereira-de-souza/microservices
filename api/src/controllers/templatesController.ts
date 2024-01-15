import { Request, Response, NextFunction } from 'express';

import knex from '@database/connection';

import {
   CreateTemplateInterface as BodyCreateInterface,
   CreateTemplateSchema
} from '@schemas/templateSchema';
import { validate } from '@validations/validation';


const create = async (req: Request<any, any, BodyCreateInterface, any>, res: Response, next: NextFunction) => {
   try {

      const dataValidation = req.body;
      const responseValidation = await validate(CreateTemplateSchema, dataValidation);
      if (responseValidation.notSuccess) {
         return res.status(422).json(responseValidation.response);
      }


      const objectCreateTemplate = {
         ...req.body
      }


      await knex('templates').insert(objectCreateTemplate);

      return res.status(200).json({
         status: 200,
         message: 'Created template successfully',
         data: null
      });
   } catch (error) {
      next(error);
   }

}


export default {
   create
}
