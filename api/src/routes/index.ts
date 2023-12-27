import { Router } from 'express';

import RoutesReports from '@routes/reportsRoute';


const Routes = (app) => {
   RoutesReports(app);
}

export default Routes
