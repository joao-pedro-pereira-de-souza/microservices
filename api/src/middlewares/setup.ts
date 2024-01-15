import '@functions/setupUploads';

import express from 'express';
import cors from 'cors';

import MiddlewareErrors from '@middlewares/erros';

import Routes from '@routes/index';
import { dirUploads } from '@configs/multer';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(dirUploads))


Routes(app)

MiddlewareErrors(app);


export {
	app
};
