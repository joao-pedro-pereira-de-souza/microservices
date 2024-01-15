import { Request, Response, NextFunction } from 'express';

const upload = (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
   try {

      const file = req.file;

      const urlFile = `${process.env.API_MAIN_URL}/uploads/${file?.filename}`;

      return res.status(200).json({ status: 200, message: 'Arquivo salvo com sucesso!', data: { url: urlFile } });
   } catch (error) {
      next(error);
   }
}

export default {
   upload
}
