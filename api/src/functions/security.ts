import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

import * as optionsJwt from '@configs/optionsToken';
import knex from '@database/connection';
import { PermissionInterface } from '@schemas/permissionsSchema'
import { UserInterface } from '@schemas/userSchema';

interface responseInterface extends UserInterface {
   permission_title: string;
   permission_number: number;
}

interface ParamsCreateTokenInterface {
   id: number;
   email: string;
}

interface PromiseValidationClientInterface {
   success: boolean;
   status?: number;
   message?: string;
   data?: responseInterface
}

interface ResponseVerifyTokenInterface {
   success: boolean;
   data?: any,
   status?: number;
   message?: string;

}
export async function ValidationClient(id: number, email: string ): Promise<PromiseValidationClientInterface> {
   const whereUser = {  'u.id': id, 'u.email': email };

   const user = await knex('users as u')
      .innerJoin('permissions as p', 'p.id', 'u.id_permission')
      .where(whereUser)
      .select([
         'u.*',
         'p.title as permission_title',
         'p.number as permission_number'
      ])
      .first() as responseInterface;

   if (!user) {
      return {
         success: false,
         status: 404,
         message: 'Sua conta não foi encontrada'
      }
   }

   if (user.deleted_at) {
        return {
         success: false,
         status: 401,
         message: 'Sua conta foi deletada.'
      }
   }

   return {
      success: true,
      data: user
   }
}

export async function GetPermission(numberPermission: number): Promise<PermissionInterface | null> {
   const wherePermission = { number: numberPermission };

   return await knex('permissions').where(wherePermission).first() as PermissionInterface
}

export function CreateHash(value_input: string) {
   return bcryptjs.hashSync(value_input, 15)

}

export function CompareHash(value_hash: string, value: string) {
   return bcryptjs.compareSync(value, value_hash);
}

export function CreateToken(params: ParamsCreateTokenInterface): String {
   const key = String(process.env.JWT_SECURITY);
   return jwt.sign(params , key, optionsJwt.optionsSign)
}


export function VerifyToken(token: string): ResponseVerifyTokenInterface {
   try {
      const key = String(process.env.JWT_SECURITY);

      const response = jwt.verify(token, key);

      if (!response) {
         return {
            success: false,
            status: 401,
            message: 'Token inválido'
         }
      }

      return {
         success: true,
         data: response
      }
   } catch (error: any) {


      switch (error?.message) {

         case 'jwt expired':
            return {
               success: false,
               message: 'Token expirado.',
               status: 401,
               data: { is_expired: true }
            }

         case 'invalid token':
            return {
               success: false,
               status: 401,
               message: 'Token inválido.'
            }

         case 'jwt malformed':
            return {
               success: false,
               status: 422,
               message: 'Token mal formatado.'
            }

         case 'wt signature is required':
            return {
               success: false,
               status: 401,
               message: 'A assinatura do token é obrigatório!.'
            }

          case 'invalid signature':
            return {
               success: false,
               status: 401,
               message: 'A assinatura do token inválida.'
            }

            case 'invalid signature':
            return {
               success: false,
               status: 401,
               message: 'A assinatura do token inválida.'
            }


         default: {
            return {
               success: false,
               status: 401,
               message: 'Ocorreu um erro no seu token de acesso!'
            }
         }
      }


   }
}
