import { Router } from 'express';

import filesController from '@controllers/filesController';

import multer from '@configs/multer';

const Reports = (app: Router) => {
   app.post('/files/uploads', multer.single('file'), filesController.upload)

}

export default Reports;
