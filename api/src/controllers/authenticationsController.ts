

import { Request, Response, NextFunction } from 'express';

import knex from '@database/connection';

import {
   AuthenticationLoginInterface as BodyLoginInterface,
   AuthenticationLoginSchema
} from '@schemas/authenticationSchema';

import { UserInterface } from '@schemas/userSchema';
import { validate } from '@validations/validation';

import { CompareHash, CreateToken } from '@functions/security';
import permissions from '@contents/permissions';

const login = async (req: Request<any, any, BodyLoginInterface, any>, res: Response, next: NextFunction) => {
   try {

      const dataValidation = req.body;
      const responseValidation = await validate(AuthenticationLoginSchema, dataValidation);
      if (responseValidation.notSuccess) {
         return res.status(422).json(responseValidation.response);
      }

      const { email, password, type_redirect } = req.body;

      const whereFindUser = {
         'u.email': email.toLowerCase(),
      }

      interface userRequest extends UserInterface {
         number_permission: number
      }
      const user = await knex('users AS u')
         .innerJoin('permissions AS p', 'p.id', 'u.id_permission')
         .select(['u.*', knex.raw('p.number AS number_permission')])
         .where(whereFindUser)
         .first() as userRequest;

      if (!user) {
         const response = {
            status: 401,
            message: 'Usuário não encontrado',
            data: null
         }

         return res.status(response.status).json(response);
      }

      const passwordValidation = CompareHash(user.password, password);

      if (!passwordValidation) {
          const response = {
            status: 401,
            message: 'Digite a senha corretamente.',
            data: null
         }

         return res.status(response.status).json(response);
      }

      const paramsCreateToken = {
         id: Number(user.id),
         email: user.email
      }
      const token = CreateToken(paramsCreateToken);


      const keysRemove = ['password', 'id_permission'];
      const datauser = Object.fromEntries(
         Object.entries(user).filter(([key]) => !keysRemove.includes(key))
      )

      if (type_redirect && user.number_permission === permissions.MASTER) {
         const authorizationHeader = `Bearer ${token}`; // Substitua pelo seu token
         res.set({
         'Authorization': authorizationHeader
      })

         // Configurar a nova URL para redirecionamento
         const novaURL = `${process.env.API_MAIN_URL}/admin/jobs`;

         // Redirecionar o cliente para a nova URL
         return res.redirect(302, novaURL);
      }

      const dataResponse = {
         token,
         user:datauser
      }
      const response = {
         status: 200,
         message: 'Login efetuado com sucesso',
         data: dataResponse
      }
      return res.status(response.status).json(response);
   } catch (error) {
      next(error);
   }

}


export default {
   login
}
