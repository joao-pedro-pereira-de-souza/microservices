import { Router } from 'express';

import UsersController from '@controllers/usersController';

const UsersRoutes = (app: Router) => {
   app.post('/users', UsersController.create);
}

export default UsersRoutes;
