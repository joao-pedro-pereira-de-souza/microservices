import { Request, Response, NextFunction } from 'express';

import knex from '@database/connection';

import {
   CreateTemplateInterface as BodyCreateInterface,
   FindTemplateSchema,
   CreateTemplateSchema
} from '@schemas/templateSchema';
import { QueryListPageInterface, QueryListPageSchema } from '@schemas/listPageSchema';

import { validate } from '@validations/validation';

interface ParamsFindInterface {
   id: number
}

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

      const response = {
         status: 201,
         message: 'Created template successfully',
         data: null
      }
      return res.status(response.status).json(response);
   } catch (error) {
      next(error);
   }

}


const list = async (req: Request<any, any, any, QueryListPageInterface>, res: Response, next: NextFunction) => {
   try {
      const dataValidation = req.query;
      const responseValidation = await validate(QueryListPageSchema, dataValidation);

      if (responseValidation.notSuccess) {
         return res.status(422).json(responseValidation.response);
      }

      const { page, limit, search_text } = responseValidation.response as QueryListPageInterface;

      console.log({page, limit, search_text})


      const whereTemplates = {
         deleted_at: null
      }
      const queryTemplates = knex('templates').where(whereTemplates);

      if (search_text) {
         queryTemplates.andWhereRaw(`title LIKE '%${search_text.toLowerCase()}%'`)
      }

      const offset = (Number(page) - 1) * Number(limit);
      const amount = (await queryTemplates).length;

      queryTemplates.limit(Number(limit));
      queryTemplates.offset(offset);

      const templates = await queryTemplates;

      const dataTemplates = {
         page,
         limit,
         amount,
         data: templates
      }

      const response = {
         status: 200,
         message: 'Dados retornados.',
         data: dataTemplates
      }
      return res.status(response.status).json(response);
   } catch (error) {
      next(error);
   }

}


const find = async (req: Request<ParamsFindInterface, any, any, any>, res: Response, next: NextFunction) => {
   try {

      const { id } = req.params
      const dataValidation = req.params;
      const responseValidation = await validate(FindTemplateSchema, dataValidation);

      if (responseValidation.notSuccess) {
         return res.status(422).json(responseValidation.response);
      }


      const whereTemplates = {
         deleted_at: null,
         id
      }
      const template = await knex('templates').where(whereTemplates).first();

      if (!template) {
         const response = {
            status: 404,
            message: 'Template não encontrado',
            data: null
         }

         return res.status(response.status).json(response)
      }

      const dataTemplates = {
         data: template
      }

      const response = {
         status: 200,
         message: 'Dados retornados.',
         data: dataTemplates
      }
      return res.status(response.status).json(response);
   } catch (error) {
      next(error);
   }

}


export default {
   create,
   list,
   find
}
