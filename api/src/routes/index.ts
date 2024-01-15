import { Router } from 'express';

import ReportsRoutes from '@routes/reportsRoutes';
import TemplatesRoutes from '@routes/templatesRoutes';
import FilesRoutes from '@routes/filesRoutes';

const Routes = (app: Router) => {
   ReportsRoutes(app);
   TemplatesRoutes(app);
   FilesRoutes(app);
}

export default Routes
