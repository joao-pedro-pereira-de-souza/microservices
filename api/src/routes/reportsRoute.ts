import { Router } from 'express';

import ReportController from '@controllers/ReportsController';

const Reports = (app) => {
   app.get('/reports', ReportController.reportUsers)

}

export default Reports;
