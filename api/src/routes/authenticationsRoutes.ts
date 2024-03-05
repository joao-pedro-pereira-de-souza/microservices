import { Router } from 'express';

import AuthenticationsController from '@controllers/authenticationsController';

const AuthenticationsRoutes = (app: Router) => {
   app.post('/users/login', AuthenticationsController.login)
}

export default AuthenticationsRoutes;
