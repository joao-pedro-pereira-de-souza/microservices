import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

import {
	RemoveInterface as QueryRemoveInterface,
	RemoveSchema
} from '@schemas/filesSchema';
import { validate } from '@validations/validation';

import { dirUploads } from '@configs/multer';

const upload = (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
   try {

      const file = req.file;
      const urlFile = `${process.env.API_MAIN_URL}/uploads/${file?.filename}`;

      return res.status(200).json({ status: 200, message: 'Arquivo salvo com sucesso!', data: { url: urlFile } });
   } catch (error) {
      next(error);
   }
}

const remove = async(req: Request<any, any, any, QueryRemoveInterface>, res: Response, next: NextFunction) => {
   try {
      const dataValidation = req.query;
      const responseValidation = await validate(RemoveSchema, dataValidation);
      if (responseValidation.notSuccess) {
         return res.status(422).json(responseValidation.response);
      }

      const { url } = req.query;

      const pathName = url.split('/').pop();
      const path = dirUploads + '/' + pathName;

      if (!fs.existsSync(path)) {
         const response = {
            status: 404,
            message: 'Arquivo não encontrado.',
            data: null
         }
         return res.status(response.status).json(response);
      }

      fs.rmSync(path)
      return res.status(200).json({ status: 200, message: 'Arquivo deletado com sucesso!', data: null });
   } catch (error) {
      next(error);
   }
}

export default {
   upload,
   remove
}
