import { Router } from 'express';


import permissions from '@contents/permissions';
import MiddlewareAuthentication from '@functions/middlewareAuthentication';

import ReportsController from '@controllers/reportsController';
import Multer from 'multer';

const storage = Multer.memoryStorage();

const multer = Multer({storage: storage})
const Reports = (app: Router) => {
   app.post('/reports', multer.single('file'), ReportsController.reportUsers);
}

export default Reports;
