import { Router } from 'express';

import TemplatesController from '@controllers/templatesController';

import permissions from '@contents/permissions';
import MiddlewareAuthentication from '@functions/middlewareAuthentication';


const Templates = (app: Router) => {

   app.post('/templates',
   async (req, res, next) => {
      const params = {
         numbers_permisson: [permissions.MASTER],
         req,
         res,
         next
      }
      await MiddlewareAuthentication(params);
   },
   TemplatesController.create)

   app.get('/templates',
   async (req, res, next) => {
      const params = {
         numbers_permisson: [permissions.CLIENT, permissions.MASTER],
         req,
         res,
         next
      }
      await MiddlewareAuthentication(params);
   },
   TemplatesController.list)

   app.get('/templates/:id',
   async (req, res, next) => {
      const params = {
         numbers_permisson: [permissions.CLIENT, permissions.MASTER],
         req,
         res,
         next
      }
      await MiddlewareAuthentication(params);
   },
   TemplatesController.find
   )

}

export default Templates;
