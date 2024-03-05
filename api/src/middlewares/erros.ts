import { Router, Request, Response, NextFunction } from 'express'
import ErrorsDefault from '@functions/errorCasesMiddleware';

const MiddlewareError = (app: Router) => {
   app.use(function (error: Error, req: Request, res: Response, next: NextFunction) {

      if (error) {

          console.error(error)
         ErrorsDefault(error, res);

         const responseErrorDefault = {
            status: 500,
            message: 'Ocorreu um erro no sistema, por favor, tente novamente.',
            data: null
         }
         return res.status(responseErrorDefault.status).json(responseErrorDefault);

      }


      next();

   })
}

export default MiddlewareError
