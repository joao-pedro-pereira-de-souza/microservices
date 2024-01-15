import { Router } from 'express';

import TemplatesController from '@controllers/templatesController';

const Templates = (app: Router) => {
   app.post('/templates', TemplatesController.create)

}

export default Templates;
