import { Router } from 'express';

import ReportsRoutes from '@routes/reportsRoutes';
import TemplatesRoutes from '@routes/templatesRoutes';
import FilesRoutes from '@routes/filesRoutes';
import AuthenticationsRoutes from '@routes/authenticationsRoutes';
import UsersRoutes from '@routes/usersRoutes';

const Routes = (app: Router) => {
   ReportsRoutes(app);
   TemplatesRoutes(app);
   FilesRoutes(app);
   AuthenticationsRoutes(app);
   UsersRoutes(app);
}

export default Routes
