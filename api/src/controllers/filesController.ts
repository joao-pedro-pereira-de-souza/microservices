import { Request, Response, NextFunction } from 'express';

const upload = (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
   try {

      return res.status(200).json({ status: 200, })
   } catch (error) {
      next(error);
   }
}

export default {
   upload
}
