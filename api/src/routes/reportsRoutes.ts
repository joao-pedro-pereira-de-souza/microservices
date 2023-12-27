import { Router } from 'express';

import ReportsController from '@controllers/reportsController';

const Reports = (app: Router) => {
   app.get('/reports', ReportsController.reportUsers)

}

export default Reports;
