
import {  Request, Response, NextFunction } from 'express';
import { VerifyToken, ValidationClient } from '@functions/security';

interface ParamsMiddlewareInterface {
   numbers_permisson?: Array<number>;
   req: any;
   res: Response;
   next: NextFunction;
   query_token?: string;
}

async function MiddlewareAuthentication({ numbers_permisson, req, res, next, query_token }: ParamsMiddlewareInterface) {
   const token = req.headers?.authorization || query_token;

   if (!token) {
      const response = {
         status: 401,
         message: 'Token não encontrado',
         data: null
      }
      return res.status(response.status).json(response);
   }

   const [_, hash] = token.split(' ')
   const responseValidationToken = VerifyToken(hash);
   if (!responseValidationToken.success) {

      const status = responseValidationToken?.status ? responseValidationToken.status : 401;
      return res.status(status).json(responseValidationToken);
   }

   const { id, email } = responseValidationToken.data;

   if (!id || !email) {
      const response = {
         status: 401,
         message: 'Token inválido',
         data: null
      }
      return res.status(response.status).json(response);
   }

   const responseValidationClient = await ValidationClient(id, email);
   if (!responseValidationClient.success) {
      const response = {
         status: responseValidationClient?.status || 401,
         message: responseValidationClient.message,
         data: null
      }

      return res.status(response.status).json(response);
   }

   if (!responseValidationClient.data) {
         const response = {
         status: 404,
         message: 'Sua conta não foi encotrada.',
         data: null
      }
      return res.status(response.status).json(response);
   }

   const { permission_number } = responseValidationClient.data;

   if (numbers_permisson && numbers_permisson.length && !numbers_permisson.includes(permission_number)) {
      const response = {
         status: 401,
         message: 'Sua conta não tem acesso aos dados.',
         data: null
      }
      return res.status(response.status).json(response);
   }

   next();
}

export default MiddlewareAuthentication;
