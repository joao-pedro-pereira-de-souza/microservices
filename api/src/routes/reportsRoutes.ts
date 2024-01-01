import { Router } from 'express';

import ReportsController from '@controllers/reportsController';

const Reports = (app: Router) => {
   app.post('/reports', ReportsController.reportUsers)

}

export default Reports;
