import { Request, Response, NextFunction } from 'express';

import knex from '@database/connection';

import {
   CreateUserInterface as BodyCreateInterface,
   CreateUserSchema
} from '@schemas/userSchema';
import { validate } from '@validations/validation';
import { CreateHash, GetPermission } from '@functions/security';

import permissions from '@contents/permissions';

const create = async (req: Request<any, any, BodyCreateInterface, any>, res: Response, next: NextFunction) => {
   try {

      const dataValidation = req.body;
      const responseValidation = await validate(CreateUserSchema, dataValidation);
      if (responseValidation.notSuccess) {
         return res.status(422).json(responseValidation.response);
      }

      const { email, name, password } = req.body;

      const permissionClient = await GetPermission(permissions.CLIENT);


      const objectUser = {
         email: email.toLowerCase(),
         password: CreateHash(password),
         name,
         id_permission: permissionClient?.id
      }


      await knex('users').insert(objectUser);

      const response = {
         status: 201,
         message: 'Created user successfully',
         data: null
      }
      return res.status(response.status).json(response);
   } catch (error) {
      next(error);
   }

}


export default {
   create
}
