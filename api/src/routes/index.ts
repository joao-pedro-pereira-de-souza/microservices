import { Router } from 'express';

import ReportsRoutes from '@routes/reportsRoutes';
import TemplatesRoutes from '@routes/templatesRoutes';


const Routes = (app: Router) => {
   ReportsRoutes(app);
   TemplatesRoutes(app);
}

export default Routes
