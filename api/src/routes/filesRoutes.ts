import { Router } from 'express';

import filesController from '@controllers/filesController';

import multer from '@configs/multer';

import permissions from '@contents/permissions';
import MiddlewareAuthentication from '@functions/middlewareAuthentication';

const Files = (app: Router) => {

   app.post('/files/uploads',
       async (req, res, next) => {
         const params = {
            numbers_permisson: [permissions.MASTER],
            req,
            res,
            next
         }
         await MiddlewareAuthentication(params);
      },
      multer.single('file'),
      filesController.upload)


      app.delete('/files/uploads',
       async (req, res, next) => {
         const params = {
            numbers_permisson: [permissions.MASTER],
            req,
            res,
            next
         }
         await MiddlewareAuthentication(params);
      },
      filesController.remove)

}

export default Files;
